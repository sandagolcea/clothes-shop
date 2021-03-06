//
//  DetailViewController.swift
//  ClothesShop
//
//  Created by Sanda Golcea on 5/24/15.
//  Copyright (c) 2015 Sanda Golcea. All rights reserved.
//

import UIKit

class DetailViewController: UIViewController {

    var product : Product?
    var shoppingCart : ShoppingCart?
    
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var priceLabel: UILabel!
    @IBOutlet weak var image: UIImageView!

    @IBAction func addToCart(sender: AnyObject) {
        shoppingCart!.addItem(product!)
    }
    @IBAction func removeFromCart(sender: AnyObject) {
        shoppingCart!.removeItem(product!)
    }

    var detailItem: AnyObject? {
        didSet {
            // Update the view.
            self.configureView()
        }
    }

    func configureView() {
        // Update the user interface for the detail item.
        if let product = self.detailItem as? Product {
            self.title = product.name
            self.product = product
            if let name = self.nameLabel {
                name.text = product.name
            }
            
            if let price = self.priceLabel {
                price.text = product.price.description
            }
            

            if let image = self.image {
                ImageAsyncLoader(url: product.imageURLs[1], { data in
                    if data? != nil {
                        var loadedImage = UIImage(data: data!)
                        dispatch_async(dispatch_get_main_queue(), {
                            self.image.image = loadedImage
                        })
                    }
                })
            }
        }
    }

    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "showShoppingCart" {
                var detailViewController = (segue.destinationViewController as ShoppingCartViewController)
            
                detailViewController.shoppingCart = self.shoppingCart
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.configureView()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

