//
//  ShoppingCart.swift
//  ClothesShop
//
//  Created by Sanda Golcea on 5/25/15.
//  Copyright (c) 2015 Sanda Golcea. All rights reserved.
//

import Foundation

class ShoppingCart {
    var items : [String : Item]
    
    init() {
        self.items = [String : Item]()
    }

    func addItem(product : Product) {
        if let item = self.items[product.id] {
            // checks that there still are products in stock before adding
            if (item.quantity < item.product.quantity) {
                item.quantity++
            }
        } else {
            var item = Item(product: product)
            self.items[product.id] = item
        }
    }
    
    func removeItem(product : Product) {
        if let item = self.items[product.id] {
            if item.quantity > 1 {
                item.quantity--
            } else {
                self.items[product.id] = nil
            }
        } else {
            self.items[product.id] = nil
        }
    }
    
    func totalItems() -> Int {
        var totalItems : Int = 0
        for (id, item) in self.items {
            totalItems += item.quantity
        }
        return totalItems
    }

    func totalPrice() -> Float {
        var total : Float = 0
        for (id, item) in self.items {
            total += Float(item.quantity) * item.product.price
        }
        return total
    }
    
    func getItems() -> [Item] {
        return self.items.values.array
    }
}
