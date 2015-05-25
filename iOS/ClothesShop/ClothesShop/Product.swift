//
//  Product.swift
//  ClothesShop
//
//  Created by Sanda Golcea on 5/24/15.
//  Copyright (c) 2015 Sanda Golcea. All rights reserved.
//

import Foundation

class Product {
    var id : String
    var name : String
    var color : String
    var category : String
    var price : Float
    var quantity : Int
    var imageURLs : [String]
    
    init(id : String, name : String, color : String, category : String, price : Float, quantity : Int, images : [String]) {
        self.id = id
        self.name = name
        self.color = color
        self.category = category
        self.price = price
        self.quantity = quantity
        self.imageURLs = images
    }
}
