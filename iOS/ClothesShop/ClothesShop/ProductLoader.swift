//
//  ProductLoader.swift
//  ClothesShop
//
//  Created by Sanda Golcea on 5/25/15.
//  Copyright (c) 2015 Sanda Golcea. All rights reserved.
//

import Foundation

class ProductLoader {
    class var products : [Product] {
        return [
            Product(id: "2", name: "Suede Shoes", color: "Blue", category: "Women's Footwear", price: 75, quantity: 2, images: ["https://clothes-shop.herokuapp.com/public/images/SuedeShoes.jpg", "https://clothes-shop.herokuapp.com/public/images/SuedeShoes_thumb.jpg"]),
            Product(id: "5", name: "Flip Flops", color: "Blue", category: "Men's Footwear", price: 19, quantity: 0, images: ["https://clothes-shop.herokuapp.com/public/images/FlipFlopsBlue.jpg", "https://clothes-shop.herokuapp.com/public/images/FlipFlopsBlue_thumb.jpg"]),
            Product(id: "7", name: "Cotton Shorts", color: "Red", category: "Women's Casualwear", price: 30, quantity: 5, images: ["https://clothes-shop.herokuapp.com/public/images/CottonShorts.jpg", "https://clothes-shop.herokuapp.com/public/images/CottonShorts_thumb.jpg"]),
            Product(id: "8", name: "Fine Stripe Short Sleeve Shirt", color: "Grey", category: "Men's Casualwear", price: 49.99, quantity: 9, images: ["https://clothes-shop.herokuapp.com/public/images/FineStripeShortSleeveShirt.jpg", "https://clothes-shop.herokuapp.com/public/images/FineStripeShortSleeveShirt_thumb.jpg"]),
            Product(id: "1", name: "Almond Toe Court Shoes", color: "Patent Black", category: "Women’s Footwear", price: 99, quantity: 5, images: ["https://clothes-shop.herokuapp.com/public/images/AlmondToeCourtShoes.jpg", "https://clothes-shop.herokuapp.com/public/images/AlmondToeCourtShoes_thumb.jpg"]),
            Product(id: "4", name: "Flip Flops", color: "Red", category: "Men's Footwear", price: 19, quantity: 6, images: ["https://clothes-shop.herokuapp.com/public/images/FlipFlopsRed.jpg", "https://clothes-shop.herokuapp.com/public/images/FlipFlopsRed_thumb.jpg"]),
            Product(id: "6", name: "Gold Button Cardigan", color: "Black", category: "Women’s Casualwear", price: 167, quantity: 6, images: ["https://clothes-shop.herokuapp.com/public/images/GoldButtonCardigan.jpg", "https://clothes-shop.herokuapp.com/public/images/GoldButtonCardigan_thumb.jpg"]),
            Product(id: "9", name: "Fine Stripe Short Sleeve Shirt", color: "Green", category: "Men's Casualwear", price: 39.99, quantity: 3, images: ["https://clothes-shop.herokuapp.com/public/images/ShortSleeveGreen.jpg", "https://clothes-shop.herokuapp.com/public/images/ShortSleeveGreen_thumb.jpg"]),
            Product(id: "10", name: "Mid Twist Cut-Out", color: "Pink", category: "Women’s Formalwear", price: 540, quantity: 5, images: ["https://clothes-shop.herokuapp.com/public/images/MidTwistCutDress.jpg", "https://clothes-shop.herokuapp.com/public/images/MidTwistCutDress_thumb.jpg"]),
            Product(id: "12", name: "Bird Print Dress", color: "Black", category: "Women’s Formalwear", price: 270, quantity: 10, images: ["https://clothes-shop.herokuapp.com/public/images/BirdPrintDress.jpg", "https://clothes-shop.herokuapp.com/public/images/BirdPrintDress_thumb.jpg"])
        ]
    }
    
    class func getProducts() -> [Product] {
        return products
    }
}