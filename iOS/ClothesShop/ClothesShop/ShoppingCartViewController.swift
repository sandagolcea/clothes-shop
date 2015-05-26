//
//  ShoppingCartViewController.swift
//  ClothesShop
//
//  Created by Sanda Golcea on 5/25/15.
//  Copyright (c) 2015 Sanda Golcea. All rights reserved.
//

import UIKit

class ShoppingCartViewController: UITableViewController
{
    var shoppingCart : ShoppingCart?
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 2
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if section == 0 {
            return self.shoppingCart!.items.count
        } else {
            return 1 // this can be the price or the empty cart message
        }
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath) as UITableViewCell

        if (indexPath.section == 0) {
            cell.textLabel?.text = self.shoppingCart!.getItems()[indexPath.row].product.name;
            cell.detailTextLabel?.text = self.shoppingCart!.getItems()[indexPath.row].quantity.description;
        }
        else // price section
        {
            if (self.shoppingCart!.totalItems() > 0) {
                cell.textLabel?.text = "Total: "+self.shoppingCart!.totalPrice().description
                cell.detailTextLabel?.text = "Items: "+self.shoppingCart!.totalItems().description

            }
            else {
                cell.textLabel?.text = "Shopping cart is empty.."
                cell.detailTextLabel?.text = " "
            }
        }
        return cell
    }
}
