//
//  Item.swift
//  ClothesShop
//
//  Created by Sanda Golcea on 5/25/15.
//  Copyright (c) 2015 Sanda Golcea. All rights reserved.
//

import Foundation

class Item {
    var product : Product
    var quantity : Int
    
    init (product: Product){
        self.product = product
        self.quantity = 1
    }
}