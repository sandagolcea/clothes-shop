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
        return 1
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.shoppingCart!.items.count
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath) as UITableViewCell
        cell.textLabel?.text = self.shoppingCart!.getItems()[indexPath.row].product.name;
        return cell
    }
}
