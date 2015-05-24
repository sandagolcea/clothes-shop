//
//  MasterViewController.swift
//  ClothesShop
//
//  Created by Sanda Golcea on 5/24/15.
//  Copyright (c) 2015 Sanda Golcea. All rights reserved.
//

import UIKit

class MasterViewController: UITableViewController {

    var products = [
        Product(id: 2, name: "Suede Shoes", color: "Blue", category: "Women's Footwear", price: 75, quantity: 2, images: ["public/images/SuedeShoes.jpg", "http://localhost:3000/public/images/SuedeShoes_thumb.jpg"]),
        Product(id: 7, name: "Cotton Shorts", color: "Red", category: "Women's Casualwear", price: 30, quantity: 5, images: ["public/images/CottonShorts.jpg", "http://localhost:3000/public/images/CottonShorts_thumb.jpg"]),
        Product(id: 8, name: "Fine Stripe Short Sleeve Shirt", color: "Grey", category: "Men's Casualwear", price: 49.99, quantity: 9, images: ["public/images/FineStripeShortSleeveShirt.jpg", "http://localhost:3000/public/images/FineStripeShortSleeveShirt_thumb.jpg"])
    ]

    // MARK: - Segues

    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "showDetail" {
            if let indexPath = self.tableView.indexPathForSelectedRow() {
                let object = self.products[indexPath.row]
            (segue.destinationViewController as DetailViewController).detailItem = object
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
        cell.textLabel!.text = self.products[indexPath.item].name
        cell.detailTextLabel!.text = self.products[indexPath.item].price.description
        
        ImageAsyncLoader(url: self.products[indexPath.item].imageURLs[1], { data in
            if data? != nil {
                var image = UIImage(data: data!)
                dispatch_async(dispatch_get_main_queue(), {
                    let originalCell = tableView.cellForRowAtIndexPath(indexPath)
                    originalCell?.imageView?.image = image
                })
            }
        } )
        
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
        callback(nil)
    }
}
