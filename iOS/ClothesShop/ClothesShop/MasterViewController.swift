//
//  MasterViewController.swift
//  ClothesShop
//
//  Created by Sanda Golcea on 5/24/15.
//  Copyright (c) 2015 Sanda Golcea. All rights reserved.
//

import UIKit

class MasterViewController: UITableViewController {

    var shoppingCart = ShoppingCart()
    var products = ProductLoader.getProducts()

    // MARK: - Segues

    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "showDetail" {
            if let indexPath = self.tableView.indexPathForSelectedRow() {
                let product = self.products[indexPath.row]
                var detailViewController = (segue.destinationViewController as DetailViewController)
                
                detailViewController.detailItem = product
                detailViewController.shoppingCart = self.shoppingCart
            }
        }
    }

    // MARK: - Table View
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.products.count
    }

    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath) as UITableViewCell
        cell.textLabel?.text = self.products[indexPath.row].name
        cell.detailTextLabel?.text = self.products[indexPath.row].price.description
        
        ImageAsyncLoader(url: self.products[indexPath.row].imageURLs[1], { data in
            if data? != nil {
                var image = UIImage(data: data!)
                // cannot access ui
                dispatch_async(dispatch_get_main_queue(), {
                    // exec in UIThread
                    if let originalCell = tableView.cellForRowAtIndexPath(indexPath)
                    {
                        originalCell.imageView?.image = image
                        self.tableView.reloadData()
                    }
                })
            }
        })
        
        return cell
    }

}


class ImageAsyncLoader {
    var url: String
    var callback: (NSData?) -> ()
    
    init(url: String, callback: (NSData?) -> ()) {
        self.url = url
        self.callback = callback
        self.fetch()
    }
    
    func fetch() {
        var imageRequest: NSURLRequest = NSURLRequest(URL: NSURL(string: self.url)!)
        NSURLConnection.sendAsynchronousRequest(imageRequest,
            queue: NSOperationQueue.mainQueue(),
            completionHandler: { response, data, error in
                if(error == nil) {
                    self.callback(data)
                } else {
                    self.callback(nil)
                }
        })
    }
}
