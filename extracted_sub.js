








"use strict";
/* ============================================================
   REWARD CONFIG — tunable per pub later
   ============================================================ */
const REWARDS = {
  unlocksOnOrder: true,
  tiers: [
    { rounds: 1, code: 'COFFEE', label: 'FREE COFFEE AT YOUR NEXT SPOONS ORDER' },
    { rounds: 4, code: 'STAMP', label: 'CLUB STAMP ON YOUR CLUB NIGHT ORDER' },
    { rounds: 8, code: 'CLUB', label: 'FREE CLUB DEAL ON YOUR CLUB NIGHT' }
  ]
};

/* ==================== 1. DATA ==================== */
// AUTO-GENERATED menu data — real prices/kcal from the 2026 Spoons menu
// (compiled from wetherspoonsmenus.com). Vibe stats are house opinion.
const CARDS = [
  {name:"Large Breakfast",art:"🍳",cat:"BREAKFAST",price:6.79,kcal:1312,grease:7,dodge:4,hang:8,regret:2,carpet:4},
  {name:"Traditional Breakfast",art:"🍳",cat:"BREAKFAST",price:5.19,kcal:770,grease:7,dodge:4,hang:8,regret:2,carpet:5},
  {name:"Small Breakfast",art:"🍳",cat:"BREAKFAST",price:3.19,kcal:435,grease:6,dodge:4,hang:8,regret:3,carpet:5},
  {name:"Freedom Breakfast",art:"🍳",cat:"BREAKFAST",price:3.40,kcal:581,grease:7,dodge:3,hang:8,regret:3,carpet:5},
  {name:"Large Vegetarian Breakfast",art:"🍳",cat:"BREAKFAST",diet:"V",price:6.79,kcal:1067,grease:7,dodge:4,hang:8,regret:3,carpet:5},
  {name:"Vegetarian Breakfast",art:"🍳",cat:"BREAKFAST",diet:"V",price:5.19,kcal:725,grease:7,dodge:4,hang:8,regret:3,carpet:5},
  {name:"Small Vegetarian Breakfast",art:"🍳",cat:"BREAKFAST",diet:"V",price:3.19,kcal:281,grease:5,dodge:4,hang:8,regret:3,carpet:5},
  {name:"Vegan Breakfast",art:"🌱",cat:"BREAKFAST",diet:"VG",price:3.19,kcal:612,grease:6,dodge:4,hang:8,regret:3,carpet:5},
  {name:"Eggs Benedict",art:"🥚",cat:"BREAKFAST",price:5.92,kcal:774,grease:6,dodge:2,hang:8,regret:3,carpet:3},
  {name:"Mushroom Benedict",art:"🍄",cat:"BREAKFAST",diet:"V",price:5.92,kcal:667,grease:6,dodge:2,hang:8,regret:3,carpet:3},
  {name:"Miner's Benedict",art:"🥚",cat:"BREAKFAST",price:5.92,kcal:749,grease:6,dodge:6,hang:8,regret:3,carpet:9},
  {name:"American Breakfast",art:"🥞",cat:"BREAKFAST",price:7.44,kcal:1258,grease:7,dodge:4,hang:8,regret:3,carpet:4},
  {name:"Small American Breakfast",art:"🥞",cat:"BREAKFAST",price:5.57,kcal:629,grease:7,dodge:4,hang:8,regret:3,carpet:5},
  {name:"Pancakes (Four)",art:"🥞",cat:"BREAKFAST",diet:"V",price:3.59,kcal:554,grease:4,dodge:4,hang:5,regret:3,carpet:5},
  {name:"Pancakes (Two)",art:"🥞",cat:"BREAKFAST",diet:"V",price:2.45,kcal:277,grease:4,dodge:4,hang:4,regret:3,carpet:5},
  {name:"Egg & Cheese Muffin",art:"🥪",cat:"BREAKFAST",diet:"V",price:2.89,kcal:286,grease:7,dodge:4,hang:5,regret:3,carpet:5},
  {name:"Egg & Bacon Muffin",art:"🥪",cat:"BREAKFAST",price:3.09,kcal:351,grease:7,dodge:4,hang:6,regret:3,carpet:5},
  {name:"Egg & Sausage Muffin",art:"🥪",cat:"BREAKFAST",price:3.09,kcal:454,grease:7,dodge:4,hang:6,regret:3,carpet:5},
  {name:"Egg & Veg Sausage Muffin",art:"🥪",cat:"BREAKFAST",diet:"V",price:3.09,kcal:357,grease:7,dodge:4,hang:5,regret:3,carpet:5},
  {name:"Breakfast Muffin",art:"🥪",cat:"BREAKFAST",price:3.29,kcal:520,grease:7,dodge:4,hang:7,regret:3,carpet:5},
  {name:"Smashed Avocado Muffin",art:"🥑",cat:"BREAKFAST",diet:"VG",price:3.29,kcal:302,grease:3,dodge:4,hang:3,regret:1,carpet:2},
  {name:"Bacon Butty",art:"🥓",cat:"BREAKFAST",price:2.89,kcal:565,grease:7,dodge:3,hang:7,regret:3,carpet:5},
  {name:"Sausage Butty",art:"🌭",cat:"BREAKFAST",price:2.89,kcal:706,grease:7,dodge:4,hang:7,regret:3,carpet:5},
  {name:"Veg Sausage Butty",art:"🌭",cat:"BREAKFAST",diet:"V",price:2.89,kcal:512,grease:7,dodge:4,hang:6,regret:3,carpet:5},
  {name:"Breakfast Wrap",art:"🌯",cat:"BREAKFAST",price:4.94,kcal:750,grease:7,dodge:4,hang:7,regret:3,carpet:5},
  {name:"Veg Breakfast Wrap",art:"🌯",cat:"BREAKFAST",diet:"V",price:4.94,kcal:742,grease:7,dodge:4,hang:7,regret:3,carpet:5},
  {name:"Scrambled Egg on Toast",art:"🍳",cat:"BREAKFAST",diet:"V",price:3.19,kcal:568,grease:5,dodge:4,hang:6,regret:3,carpet:5},
  {name:"Beans on Toast",art:"🍞",cat:"BREAKFAST",diet:"V",price:3.19,kcal:558,grease:3,dodge:4,hang:6,regret:3,carpet:5},
  {name:"Fresh Fruit",art:"🍓",cat:"BREAKFAST",diet:"VG",price:2.99,kcal:186,grease:0,dodge:0,hang:1,regret:0,carpet:0},
  {name:"Fresh Fruit & Yoghurt",art:"🍓",cat:"BREAKFAST",diet:"V",price:3.49,kcal:320,grease:0,dodge:0,hang:1,regret:0,carpet:1},
  {name:"Porridge",art:"🥣",cat:"BREAKFAST",diet:"V",price:1.99,kcal:188,grease:0,dodge:0,hang:3,regret:0,carpet:1},
  {name:"Tea & Toast",art:"🍞",cat:"BREAKFAST",diet:"V",price:2.15,kcal:450,grease:2,dodge:4,hang:4,regret:1,carpet:2},
  {name:"American Burger",art:"🍔",cat:"BURGER",price:6.99,kcal:1131,grease:7,dodge:5,hang:8,regret:4,carpet:6},
  {name:"American Cheese Burger",art:"🍔",cat:"BURGER",price:7.49,kcal:1211,grease:7,dodge:5,hang:8,regret:4,carpet:6},
  {name:"Crunchy Chicken Burger",art:"🍔",cat:"BURGER",price:5.99,kcal:1042,grease:7,dodge:5,hang:8,regret:4,carpet:6},
  {name:"Korean Fried Chicken Burger",art:"🍔",cat:"BURGER",price:5.99,kcal:978,grease:8,dodge:6,hang:8,regret:4,carpet:6},
  {name:"The Classic Burger",art:"🍔",cat:"BURGER",price:6.22,kcal:1143,grease:7,dodge:5,hang:8,regret:4,carpet:6},
  {name:"Grilled Chicken Breast Burger",art:"🐔",cat:"BURGER",price:6.22,kcal:993,grease:4,dodge:5,hang:7,regret:4,carpet:6},
  {name:"Fried Buttermilk Chicken Burger",art:"🍔",cat:"BURGER",price:8.39,kcal:1062,grease:8,dodge:5,hang:8,regret:4,carpet:6},
  {name:"The Plant Burger",art:"🌱",cat:"BURGER",diet:"VG",price:6.22,kcal:1213,grease:7,dodge:6,hang:8,regret:3,carpet:6},
  {name:"Halloumi & Sweet Chilli Burger",art:"🧀",cat:"BURGER",diet:"V",price:6.22,kcal:1265,grease:8,dodge:5,hang:8,regret:4,carpet:6},
  {name:"The Big Smoke",art:"🍖",cat:"BURGER",price:10.89,kcal:1679,grease:7,dodge:5,hang:9,regret:3,carpet:5},
  {name:"Cheese Meltdown",art:"🧀",cat:"BURGER",price:10.89,kcal:1589,grease:9,dodge:5,hang:9,regret:4,carpet:6},
  {name:"Buffalo Burger",art:"🔥",cat:"BURGER",price:10.89,kcal:1679,grease:9,dodge:7,hang:9,regret:4,carpet:6},
  {name:"BBQ Stack",art:"🌱",cat:"BURGER",diet:"VG",price:10.59,kcal:1360,grease:7,dodge:5,hang:8,regret:4,carpet:6},
  {name:"The Ultimate Burger",art:"👑",cat:"BURGER",price:10.89,kcal:1698,grease:7,dodge:5,hang:9,regret:4,carpet:6},
  {name:"Tennessee Burger",art:"🥃",cat:"BURGER",price:10.89,kcal:1566,grease:7,dodge:5,hang:9,regret:4,carpet:6},
  {name:"The Empire State",art:"🗽",cat:"BURGER",price:12.05,kcal:1883,grease:9,dodge:5,hang:9,regret:6,carpet:7},
  {name:"Margherita 8\"",art:"🍕",cat:"PIZZA",diet:"V",price:6.44,kcal:475,grease:6,dodge:4,hang:6,regret:3,carpet:7},
  {name:"Spicy Chicken 8\"",art:"🍕",cat:"PIZZA",price:7.01,kcal:687,grease:6,dodge:6,hang:6,regret:3,carpet:7},
  {name:"Pepperoni 8\"",art:"🍕",cat:"PIZZA",price:7.01,kcal:565,grease:6,dodge:6,hang:6,regret:3,carpet:7},
  {name:"Ham & Mushroom 8\"",art:"🍕",cat:"PIZZA",price:7.01,kcal:517,grease:6,dodge:4,hang:6,regret:3,carpet:7},
  {name:"BBQ Chicken 8\"",art:"🍕",cat:"PIZZA",price:7.01,kcal:562,grease:6,dodge:4,hang:6,regret:3,carpet:7},
  {name:"Mediterranean Veg 8\"",art:"🍕",cat:"PIZZA",diet:"V",price:7.01,kcal:513,grease:5,dodge:2,hang:6,regret:3,carpet:7},
  {name:"Vegan Mediterranean 8\"",art:"🍕",cat:"PIZZA",diet:"VG",price:7.01,kcal:349,grease:5,dodge:2,hang:6,regret:3,carpet:7},
  {name:"Spicy Meat Feast 8\"",art:"🍕",cat:"PIZZA",price:7.60,kcal:616,grease:7,dodge:8,hang:6,regret:3,carpet:7},
  {name:"Margherita 11\"",art:"🍕",cat:"PIZZA",diet:"V",price:9.61,kcal:949,grease:6,dodge:4,hang:6,regret:3,carpet:7},
  {name:"Spicy Chicken 11\"",art:"🍕",cat:"PIZZA",price:10.78,kcal:1373,grease:6,dodge:6,hang:6,regret:3,carpet:7},
  {name:"Pepperoni 11\"",art:"🍕",cat:"PIZZA",price:10.78,kcal:1130,grease:6,dodge:6,hang:6,regret:3,carpet:7},
  {name:"Ham & Mushroom 11\"",art:"🍕",cat:"PIZZA",price:10.78,kcal:1034,grease:6,dodge:4,hang:6,regret:3,carpet:7},
  {name:"BBQ Chicken 11\"",art:"🍕",cat:"PIZZA",price:10.78,kcal:1111,grease:6,dodge:4,hang:6,regret:3,carpet:7},
  {name:"Mediterranean Veg 11\"",art:"🍕",cat:"PIZZA",diet:"V",price:10.78,kcal:1026,grease:5,dodge:2,hang:6,regret:3,carpet:7},
  {name:"Vegan Mediterranean 11\"",art:"🍕",cat:"PIZZA",diet:"VG",price:10.78,kcal:697,grease:5,dodge:2,hang:6,regret:3,carpet:7},
  {name:"Spicy Meat Feast 11\"",art:"🍕",cat:"PIZZA",price:11.95,kcal:1219,grease:7,dodge:8,hang:6,regret:3,carpet:7},
  {name:"Nachos",art:"🧀",cat:"SIDES",diet:"V",price:6.49,kcal:1011,grease:8,dodge:4,hang:6,regret:4,carpet:4},
  {name:"Bowl of Chips",art:"🍟",cat:"SIDES",diet:"VG",price:4.09,kcal:964,grease:9,dodge:4,hang:7,regret:4,carpet:9},
  {name:"Chips with Curry Sauce",art:"🍟",cat:"SIDES",diet:"VG",price:5.08,kcal:1073,grease:8,dodge:5,hang:7,regret:4,carpet:10},
  {name:"Cheesy Chips",art:"🧀",cat:"SIDES",diet:"V",price:5.74,kcal:1256,grease:9,dodge:4,hang:8,regret:3,carpet:8},
  {name:"Loaded Chips",art:"🧀",cat:"SIDES",price:6.04,kcal:1303,grease:9,dodge:4,hang:8,regret:4,carpet:7},
  {name:"Shawarma Chicken Topped Chips",art:"🍟",cat:"SIDES",price:6.04,kcal:1300,grease:8,dodge:7,hang:8,regret:4,carpet:7},
  {name:"Halloumi-Style Fries",art:"🧀",cat:"SIDES",diet:"V",price:5.59,kcal:458,grease:8,dodge:4,hang:4,regret:2,carpet:7},
  {name:"Chicken Bites (10)",art:"🍗",cat:"SIDES",price:6.71,kcal:411,grease:6,dodge:6,hang:4,regret:4,carpet:7},
  {name:"Southern-Fried Chicken Strips (5)",art:"🍗",cat:"SIDES",price:6.71,kcal:547,grease:7,dodge:6,hang:4,regret:4,carpet:7},
  {name:"Chicken Wings (10) + Naga",art:"🍗",cat:"SIDES",price:7.39,kcal:1026,grease:8,dodge:7,hang:5,regret:4,carpet:7},
  {name:"Quorn Nuggets (8)",art:"🌱",cat:"SIDES",diet:"VG",price:5.59,kcal:369,grease:6,dodge:7,hang:4,regret:3,carpet:7},
  {name:"Sweet Potato, Chickpea & Spinach Curry",art:"🍛",cat:"CURRY",diet:"VG",price:10.78,kcal:912,grease:5,dodge:3,hang:8,regret:1,carpet:9},
  {name:"Chicken Tikka Masala",art:"🍛",cat:"CURRY",price:10.78,kcal:1032,grease:5,dodge:3,hang:8,regret:1,carpet:8},
  {name:"Chicken Jalfrezi",art:"🍛",cat:"CURRY",price:8.99,kcal:919,grease:5,dodge:3,hang:9,regret:2,carpet:9},
  {name:"Beef Madras",art:"🍛",cat:"CURRY",price:10.78,kcal:1084,grease:5,dodge:4,hang:9,regret:2,carpet:9},
  {name:"Simple Sweet Potato Curry",art:"🍛",cat:"CURRY",diet:"VG",price:8.54,kcal:552,grease:5,dodge:3,hang:8,regret:1,carpet:9},
  {name:"Simple Chicken Tikka Masala",art:"🍛",cat:"CURRY",price:8.54,kcal:672,grease:5,dodge:3,hang:8,regret:1,carpet:8},
  {name:"Simple Chicken Jalfrezi",art:"🍛",cat:"CURRY",price:8.54,kcal:560,grease:5,dodge:3,hang:9,regret:2,carpet:9},
  {name:"Simple Beef Madras",art:"🍛",cat:"CURRY",price:8.54,kcal:725,grease:5,dodge:3,hang:9,regret:2,carpet:9},
  {name:"Katsu Grilled Chicken Curry",art:"🍛",cat:"CURRY",price:9.66,kcal:558,grease:5,dodge:3,hang:8,regret:1,carpet:5},
  {name:"Katsu Quorn Nugget Curry",art:"🍛",cat:"CURRY",diet:"VG",price:9.66,kcal:678,grease:5,dodge:3,hang:8,regret:1,carpet:9},
  {name:"Katsu Chicken Curry",art:"🍛",cat:"CURRY",price:10.78,kcal:844,grease:5,dodge:3,hang:8,regret:1,carpet:9},
  {name:"Chicken & Tenderstem Broccoli",art:"🥦",cat:"CHICKEN",price:8.99,kcal:596,grease:3,dodge:1,hang:7,regret:1,carpet:2},
  {name:"Chicken Pomodoro",art:"🍅",cat:"CHICKEN",price:8.99,kcal:470,grease:3,dodge:1,hang:7,regret:1,carpet:3},
  {name:"BBQ Chicken Melt",art:"🍗",cat:"CHICKEN",price:10.52,kcal:1133,grease:8,dodge:5,hang:9,regret:3,carpet:6},
  {name:"Chicken Spice Bag",art:"🌶️",cat:"CHICKEN",price:9.19,kcal:1065,grease:9,dodge:9,hang:6,regret:3,carpet:6},
  {name:"Quorn No Chicken Spice Bag",art:"🌶️",cat:"CHICKEN",diet:"VG",price:9.19,kcal:944,grease:8,dodge:8,hang:6,regret:3,carpet:6},
  {name:"Sticky Korean Fried Chicken",art:"🍢",cat:"CHICKEN",price:10.78,kcal:1226,grease:9,dodge:7,hang:7,regret:3,carpet:6},
  {name:"Sticky Korean Grilled Chicken",art:"🍢",cat:"CHICKEN",price:10.78,kcal:984,grease:6,dodge:4,hang:7,regret:3,carpet:6},
  {name:"Sticky Korean Fried Quorn",art:"🌱",cat:"CHICKEN",diet:"V",price:10.78,kcal:1104,grease:8,dodge:6,hang:7,regret:3,carpet:6},
  {name:"Boneless Basket",art:"🍗",cat:"CHICKEN",price:9.61,kcal:1247,grease:9,dodge:7,hang:7,regret:3,carpet:6},
  {name:"Chicken Bites Basket",art:"🍗",cat:"CHICKEN",price:9.19,kcal:1124,grease:8,dodge:7,hang:6,regret:3,carpet:6},
  {name:"Southern-Fried Strips Basket",art:"🍗",cat:"CHICKEN",price:9.61,kcal:1282,grease:9,dodge:7,hang:7,regret:3,carpet:6},
  {name:"Quorn Nuggets Basket",art:"🌱",cat:"CHICKEN",diet:"VG",price:9.19,kcal:1104,grease:8,dodge:7,hang:5,regret:3,carpet:6},
  {name:"Freshly Battered Fish & Chips",art:"🐟",cat:"CLASSIC",price:12.35,kcal:1251,grease:9,dodge:3,hang:8,regret:2,carpet:8},
  {name:"Whitby Breaded Scampi",art:"🦐",cat:"CLASSIC",price:9.39,kcal:1135,grease:8,dodge:5,hang:7,regret:2,carpet:8},
  {name:"All-Day Brunch",art:"🍳",cat:"CLASSIC",price:10.36,kcal:1245,grease:6,dodge:3,hang:9,regret:2,carpet:8},
  {name:"Vegetarian All-Day Brunch",art:"🍳",cat:"CLASSIC",diet:"V",price:10.36,kcal:992,grease:6,dodge:3,hang:9,regret:3,carpet:8},
  {name:"Steak & Ale Pudding",art:"🥧",cat:"CLASSIC",price:9.26,kcal:1291,grease:7,dodge:3,hang:9,regret:1,carpet:9},
  {name:"Bangers & Mash",art:"🌭",cat:"CLASSIC",price:9.26,kcal:888,grease:6,dodge:3,hang:8,regret:1,carpet:6},
  {name:"Vegetarian Bangers & Mash",art:"🌭",cat:"CLASSIC",diet:"V",price:9.26,kcal:598,grease:5,dodge:3,hang:7,regret:1,carpet:8},
  {name:"Wiltshire Ham, Eggs & Chips",art:"🍳",cat:"CLASSIC",price:8.66,kcal:874,grease:6,dodge:3,hang:7,regret:3,carpet:8},
  {name:"Sausages, Chips & Beans",art:"🌭",cat:"CLASSIC",price:8.36,kcal:1170,grease:8,dodge:5,hang:8,regret:3,carpet:8},
  {name:"Vegan Sausages, Chips & Beans",art:"🌭",cat:"CLASSIC",diet:"VG",price:8.36,kcal:880,grease:7,dodge:5,hang:7,regret:3,carpet:8},
  {name:"Chilli Bean Non-Carne",art:"🌶️",cat:"CLASSIC",diet:"VG",price:9.26,kcal:644,grease:4,dodge:3,hang:8,regret:1,carpet:8},
  {name:"Small Fish & Chips",art:"🐟",cat:"CLASSIC",price:9.89,kcal:687,grease:8,dodge:3,hang:6,regret:2,carpet:8},
  {name:"Small Whitby Scampi",art:"🦐",cat:"CLASSIC",price:8.39,kcal:628,grease:7,dodge:5,hang:6,regret:3,carpet:8},
  {name:"Small Ham, Egg & Chips",art:"🍳",cat:"CLASSIC",price:7.56,kcal:464,grease:6,dodge:3,hang:6,regret:3,carpet:8},
  {name:"Small All-Day Brunch",art:"🍳",cat:"CLASSIC",price:7.55,kcal:681,grease:6,dodge:3,hang:8,regret:3,carpet:8},
  {name:"Small Veg All-Day Brunch",art:"🍳",cat:"CLASSIC",diet:"V",price:7.55,kcal:590,grease:6,dodge:3,hang:8,regret:3,carpet:8},
  {name:"Cheddar & Tomato Panini",art:"🥪",cat:"DELI",diet:"V",price:4.99,kcal:604,grease:4,dodge:3,hang:5,regret:3,carpet:3},
  {name:"Ham & Cheddar Panini",art:"🥪",cat:"DELI",price:4.99,kcal:589,grease:4,dodge:3,hang:5,regret:3,carpet:3},
  {name:"BBQ Chicken, Bacon & Cheddar Panini",art:"🥪",cat:"DELI",price:4.99,kcal:602,grease:4,dodge:4,hang:6,regret:3,carpet:3},
  {name:"Tuna Mayo & Cheddar Panini",art:"🥪",cat:"DELI",price:4.99,kcal:581,grease:4,dodge:4,hang:5,regret:4,carpet:3},
  {name:"Brunch Wrap",art:"🌯",cat:"DELI",price:5.04,kcal:754,grease:4,dodge:3,hang:7,regret:3,carpet:3},
  {name:"Vegetarian Brunch Wrap",art:"🌯",cat:"DELI",diet:"V",price:5.04,kcal:634,grease:4,dodge:3,hang:7,regret:3,carpet:3},
  {name:"Korean Fried Chicken Wrap",art:"🌯",cat:"DELI",price:5.04,kcal:582,grease:4,dodge:5,hang:5,regret:3,carpet:3},
  {name:"Shawarma Chicken Wrap",art:"🌯",cat:"DELI",price:5.04,kcal:739,grease:4,dodge:6,hang:6,regret:3,carpet:3},
  {name:"Southern-Fried Chicken Wrap",art:"🌯",cat:"DELI",price:5.04,kcal:636,grease:4,dodge:5,hang:6,regret:3,carpet:3},
  {name:"Fried Halloumi Wrap",art:"🧀",cat:"DELI",diet:"V",price:5.04,kcal:740,grease:7,dodge:3,hang:5,regret:2,carpet:3},
  {name:"Quorn Nuggets Wrap",art:"🌱",cat:"DELI",diet:"VG",price:5.04,kcal:535,grease:4,dodge:5,hang:4,regret:3,carpet:3},
  {name:"Cold Chicken Breast Wrap",art:"🌯",cat:"DELI",price:5.04,kcal:512,grease:2,dodge:2,hang:3,regret:3,carpet:3},
  {name:"Jacket Potato: Tuna Mayo",art:"🥔",cat:"JACKET",price:4.99,kcal:634,grease:3,dodge:2,hang:4,regret:3,carpet:4},
  {name:"Jacket Potato: Coleslaw",art:"🥔",cat:"JACKET",diet:"V",price:4.99,kcal:602,grease:3,dodge:2,hang:4,regret:2,carpet:4},
  {name:"Jacket Potato: Cheese",art:"🥔",cat:"JACKET",diet:"V",price:4.99,kcal:628,grease:5,dodge:2,hang:4,regret:2,carpet:4},
  {name:"Jacket Potato: Baked Beans",art:"🥔",cat:"JACKET",diet:"VG",price:4.99,kcal:462,grease:3,dodge:2,hang:5,regret:2,carpet:4},
  {name:"Jacket Potato: Chilli Non-Carne",art:"🥔",cat:"JACKET",diet:"VG",price:4.99,kcal:485,grease:3,dodge:2,hang:5,regret:2,carpet:4},
  {name:"Jacket Potato: Mediterranean Veg",art:"🥔",cat:"JACKET",diet:"VG",price:4.99,kcal:475,grease:3,dodge:2,hang:4,regret:2,carpet:4},
  {name:"The Smoky Spud",art:"🥔",cat:"JACKET",price:6.49,kcal:699,grease:5,dodge:4,hang:6,regret:2,carpet:4},
  {name:"The Mexican Spud",art:"🥔",cat:"JACKET",diet:"V",price:6.49,kcal:736,grease:5,dodge:4,hang:6,regret:2,carpet:4},
  {name:"The Loaded Spud",art:"🥔",cat:"JACKET",price:6.49,kcal:894,grease:8,dodge:5,hang:7,regret:2,carpet:4},
  {name:"Ramen Noodle Bowl",art:"🍜",cat:"SALAD",diet:"V",price:7.69,kcal:477,grease:3,dodge:1,hang:5,regret:1,carpet:1},
  {name:"Chicken & Bacon Salad",art:"🥗",cat:"SALAD",price:7.99,kcal:566,grease:2,dodge:0,hang:3,regret:1,carpet:1},
  {name:"Mediterranean Salad",art:"🥗",cat:"SALAD",diet:"V",price:7.99,kcal:431,grease:1,dodge:0,hang:2,regret:0,carpet:1},
  {name:"Halloumi & Mediterranean Salad",art:"🥗",cat:"SALAD",diet:"V",price:7.99,kcal:589,grease:3,dodge:0,hang:2,regret:1,carpet:1},
  {name:"Pasta Alfredo",art:"🍝",cat:"SALAD",diet:"V",price:8.23,kcal:492,grease:5,dodge:0,hang:5,regret:1,carpet:3},
  {name:"British Beef & Pancetta Lasagne",art:"🍝",cat:"SALAD",price:10.40,kcal:1347,grease:8,dodge:0,hang:9,regret:2,carpet:6},
  {name:"Five Chicken Wings",art:"🍗",cat:"WINGS",price:3.10,kcal:445,grease:7,dodge:5,hang:6,regret:3,carpet:5},
  {name:"Five Chicken Bites",art:"🍗",cat:"WINGS",price:3.10,kcal:153,grease:5,dodge:6,hang:3,regret:3,carpet:5},
  {name:"Three Southern-Fried Strips",art:"🍗",cat:"WINGS",price:3.10,kcal:276,grease:7,dodge:5,hang:6,regret:3,carpet:5},
  {name:"Five Quorn Nuggets",art:"🌱",cat:"WINGS",diet:"VG",price:3.10,kcal:192,grease:7,dodge:5,hang:6,regret:3,carpet:5},
  {name:"Small Chips",art:"🍟",cat:"SIDES",diet:"VG",price:2.59,kcal:602,grease:8,dodge:4,hang:6,regret:4,carpet:9},
  {name:"Whitby Scampi (8) Side",art:"🦐",cat:"SIDES",price:5.49,kcal:464,grease:7,dodge:5,hang:4,regret:4,carpet:7},
  {name:"Side Salad",art:"🥬",cat:"SIDES",diet:"VG",price:2.49,kcal:111,grease:0,dodge:0,hang:1,regret:0,carpet:0},
  {name:"Mediterranean Side Salad",art:"🥬",cat:"SIDES",diet:"V",price:3.42,kcal:214,grease:1,dodge:0,hang:1,regret:0,carpet:0},
  {name:"Mediterranean Vegetables",art:"🥒",cat:"SIDES",diet:"VG",price:1.67,kcal:108,grease:0,dodge:0,hang:1,regret:0,carpet:0},
  {name:"Tenderstem Broccoli & Peas",art:"🥦",cat:"SIDES",diet:"VG",price:1.50,kcal:91,grease:0,dodge:0,hang:1,regret:0,carpet:0},
  {name:"Gravy",art:"🥣",cat:"SIDES",diet:"VG",price:0.99,kcal:37,grease:2,dodge:2,hang:2,regret:7,carpet:10},
  {name:"Sliced Chilli",art:"🌶️",cat:"SIDES",diet:"VG",price:0.99,kcal:3,grease:0,dodge:2,hang:0,regret:5,carpet:0},
  {name:"Coleslaw",art:"🥗",cat:"SIDES",diet:"V",price:1.60,kcal:266,grease:4,dodge:3,hang:2,regret:4,carpet:7},
  {name:"Peas",art:"🟢",cat:"SIDES",diet:"VG",price:1.09,kcal:148,grease:0,dodge:0,hang:1,regret:2,carpet:7},
  {name:"Mushy Peas",art:"🟢",cat:"SIDES",diet:"VG",price:1.09,kcal:204,grease:1,dodge:3,hang:2,regret:4,carpet:2},
  {name:"Onion Rings (6)",art:"🧅",cat:"SIDES",diet:"V",price:2.55,kcal:244,grease:8,dodge:4,hang:4,regret:2,carpet:7},
  {name:"Onion Rings (12)",art:"🧅",cat:"SIDES",diet:"V",price:3.80,kcal:489,grease:9,dodge:4,hang:4,regret:2,carpet:7},
  {name:"Garlic Pizza Bread 8\"",art:"🧄",cat:"SIDES",diet:"V",price:4.75,kcal:389,grease:6,dodge:3,hang:3,regret:2,carpet:7},
  {name:"Garlic Pizza Bread 11\"",art:"🧄",cat:"SIDES",diet:"V",price:5.97,kcal:778,grease:7,dodge:3,hang:4,regret:2,carpet:7},
  {name:"Garlic Bread 8\" + Cheese",art:"🧄",cat:"SIDES",diet:"V",price:5.33,kcal:479,grease:7,dodge:3,hang:4,regret:2,carpet:7},
  {name:"Garlic Bread 11\" + Cheese",art:"🧄",cat:"SIDES",diet:"V",price:6.84,kcal:958,grease:8,dodge:3,hang:4,regret:2,carpet:7},
  {name:"Black Pudding",art:"⬛",cat:"SIDES",price:0.90,kcal:67,grease:8,dodge:9,hang:3,regret:3,carpet:9},
  {name:"Hash Brown",art:"🥔",cat:"SIDES",diet:"V",price:0.61,kcal:82,grease:9,dodge:4,hang:4,regret:1,carpet:6},
  {name:"Fried Egg (Side)",art:"🍳",cat:"SIDES",diet:"V",price:1.08,kcal:56,grease:6,dodge:2,hang:2,regret:1,carpet:7},
  {name:"Baked Beans (Side)",art:"🫘",cat:"SIDES",diet:"VG",price:1.08,kcal:126,grease:2,dodge:1,hang:2,regret:3,carpet:7},
  {name:"Two Tomato Halves",art:"🍅",cat:"SIDES",diet:"VG",price:0.67,kcal:16,grease:0,dodge:0,hang:0,regret:1,carpet:0},
  {name:"Fresh Fruit & Ice Cream",art:"🍨",cat:"DESSERT",diet:"V",price:3.69,kcal:379,grease:1,dodge:1,hang:2,regret:1,carpet:2},
  {name:"Salted Caramel Sticky Toffee Pudding",art:"🍮",cat:"DESSERT",diet:"V",price:5.67,kcal:799,grease:4,dodge:1,hang:2,regret:1,carpet:10},
  {name:"Warm Chocolate Fudge Cake",art:"🍰",cat:"DESSERT",diet:"V",price:6.02,kcal:832,grease:4,dodge:1,hang:2,regret:1,carpet:8},
  {name:"Warm Chocolate Brownie",art:"🍫",cat:"DESSERT",diet:"V",price:6.02,kcal:697,grease:4,dodge:1,hang:2,regret:1,carpet:8},
  {name:"Warm Cookie Dough Sandwich",art:"🍪",cat:"DESSERT",diet:"V",price:6.02,kcal:601,grease:5,dodge:1,hang:2,regret:1,carpet:8},
  {name:"Bramley Apple Crumble",art:"🥧",cat:"DESSERT",diet:"V",price:6.29,kcal:603,grease:4,dodge:1,hang:2,regret:1,carpet:7},
  {name:"American-Style Pancakes (Dessert)",art:"🥞",cat:"DESSERT",diet:"V",price:5.57,kcal:650,grease:5,dodge:1,hang:2,regret:1,carpet:8},
  {name:"Millionaire's Shortbread",art:"🍫",cat:"DESSERT",diet:"V",price:2.75,kcal:331,grease:3,dodge:1,hang:2,regret:1,carpet:9},
  {name:"Vanilla Ice Cream & Sauce",art:"🍨",cat:"DESSERT",diet:"V",price:2.40,kcal:257,grease:1,dodge:1,hang:2,regret:1,carpet:2},
  {name:"Cookie Crunch",art:"🍪",cat:"DESSERT",diet:"V",price:2.40,kcal:287,grease:3,dodge:1,hang:2,regret:1,carpet:8},
  {name:"Mini Chocolate Brownie",art:"🍫",cat:"DESSERT",diet:"V",price:3.57,kcal:397,grease:4,dodge:1,hang:2,regret:1,carpet:8},
  {name:"Mini Cookie Dough Sandwich",art:"🍪",cat:"DESSERT",diet:"V",price:3.57,kcal:349,grease:4,dodge:1,hang:2,regret:1,carpet:8},
  {name:"Mini American Pancakes",art:"🥞",cat:"DESSERT",diet:"V",price:4.07,kcal:373,grease:4,dodge:1,hang:2,regret:1,carpet:8},
  {name:"Flat White",art:"☕",cat:"HOT DRINK",price:1.89,kcal:92,grease:0,dodge:0,hang:5,regret:1,carpet:2},
  {name:"Cappuccino",art:"☕",cat:"HOT DRINK",price:1.89,kcal:102,grease:0,dodge:0,hang:5,regret:1,carpet:2},
  {name:"Latte",art:"☕",cat:"HOT DRINK",price:1.89,kcal:113,grease:0,dodge:0,hang:5,regret:1,carpet:2},
  {name:"Espresso",art:"☕",cat:"HOT DRINK",price:1.89,kcal:6,grease:0,dodge:0,hang:6,regret:1,carpet:2},
  {name:"Black Coffee",art:"☕",cat:"HOT DRINK",price:1.89,kcal:6,grease:0,dodge:0,hang:6,regret:1,carpet:2},
  {name:"White Coffee",art:"☕",cat:"HOT DRINK",price:1.89,kcal:24,grease:0,dodge:0,hang:5,regret:1,carpet:2},
  {name:"Tea",art:"🫖",cat:"HOT DRINK",price:1.89,kcal:14,grease:0,dodge:0,hang:4,regret:0,carpet:1},
  {name:"Hot Chocolate",art:"🍫",cat:"HOT DRINK",price:1.89,kcal:169,grease:0,dodge:1,hang:3,regret:1,carpet:6},
  {name:"Pint of Carling",art:"🍺",cat:"COLD DRINK",price:4.19,kcal:187,grease:0,dodge:2,hang:6,regret:1,carpet:3},
  {name:"Pint of Stella Artois",art:"🍺",cat:"COLD DRINK",price:4.69,kcal:227,grease:0,dodge:3,hang:7,regret:2,carpet:3},
  {name:"Pint of Guinness",art:"🍺",cat:"COLD DRINK",price:5.19,kcal:210,grease:0,dodge:2,hang:8,regret:1,carpet:8},
  {name:"Pint of Guest Ale",art:"🍺",cat:"COLD DRINK",price:5.05,kcal:220,grease:0,dodge:3,hang:7,regret:1,carpet:7},
  {name:"Pint of Pepsi",art:"🥤",cat:"COLD DRINK",price:2.99,kcal:250,grease:0,dodge:5,hang:3,regret:2,carpet:2},
  {name:"Monster Energy",art:"⚡",cat:"COLD DRINK",price:2.99,kcal:225,grease:0,dodge:9,hang:4,regret:7,carpet:0},
  {name:"J2O Purple",art:"🧃",cat:"COLD DRINK",price:2.79,kcal:140,grease:0,dodge:4,hang:2,regret:3,carpet:3},
  {name:"Glass of White Wine (125ml)",art:"🍷",cat:"COLD DRINK",price:3.19,kcal:83,grease:0,dodge:2,hang:4,regret:2,carpet:3},
  {name:"Large Glass of Wine (250ml)",art:"🍷",cat:"COLD DRINK",price:4.69,kcal:166,grease:0,dodge:2,hang:5,regret:3,carpet:3},
  {name:"Prosecco (125ml)",art:"🥂",cat:"COLD DRINK",price:3.29,kcal:80,grease:0,dodge:2,hang:4,regret:2,carpet:3},
  {name:"Gin & Tonic",art:"🍸",cat:"COLD DRINK",price:3.19,kcal:90,grease:0,dodge:2,hang:5,regret:1,carpet:3},
  {name:"Whisky (25ml)",art:"🥃",cat:"COLD DRINK",price:2.79,kcal:61,grease:0,dodge:3,hang:6,regret:2,carpet:6},
  {name:"Glass of Tap Water",art:"💧",cat:"COLD DRINK",diet:"VG",price:0.00,kcal:0,grease:0,dodge:0,hang:1,regret:0,carpet:0},
  {name:"Spicy Rice (Side)",art:"🍚",cat:"SIDES",diet:"VG",price:0.99,kcal:203,grease:2,dodge:2,hang:2,regret:2,carpet:4},
  {name:"Basmati Pilau Rice (Side)",art:"🍚",cat:"SIDES",diet:"VG",price:0.99,kcal:552,grease:2,dodge:1,hang:2,regret:1,carpet:3},
  {name:"Coconut-Flavour Rice (Side)",art:"🍚",cat:"SIDES",diet:"VG",price:0.99,kcal:722,grease:3,dodge:1,hang:2,regret:2,carpet:3},
  {name:"Maris Piper Mash (Side)",art:"🥔",cat:"SIDES",diet:"VG",price:0.99,kcal:219,grease:3,dodge:1,hang:3,regret:1,carpet:4},
  {name:"Garlic & Herb Dip",art:"🧄",cat:"SIDES",diet:"V",price:0.99,kcal:301,grease:4,dodge:2,hang:1,regret:2,carpet:3},
  {name:"Sliced Pickled Gherkins",art:"🥒",cat:"SIDES",diet:"VG",price:0.55,kcal:5,grease:0,dodge:1,hang:1,regret:4,carpet:1},
  {name:"Bacon Roll",art:"🥓",cat:"DELI",price:2.49,kcal:318,grease:6,dodge:2,hang:6,regret:2,carpet:4},
  {name:"Belgian Chocolate Biscuit",art:"🍪",cat:"DESSERT",price:0.75,kcal:129,grease:3,dodge:1,hang:2,regret:2,carpet:6},
  {name:"Stem Ginger Biscuit",art:"🍪",cat:"DESSERT",price:0.75,kcal:123,grease:2,dodge:1,hang:2,regret:2,carpet:5},
];


// Derived stats + stat metadata ------------------------------------
const clamp10 = v => Math.max(0, Math.min(10, v));
function hashStr(s){ let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
const MESS_BASE = { BREAKFAST:1, BURGER:1, PIZZA:1, CURRY:2, CHICKEN:1, CLASSIC:1, DELI:0, JACKET:0, SALAD:-1, WINGS:1, SIDES:1, DESSERT:1, "HOT DRINK":-1, "COLD DRINK":-1 };
const SPEED_BASE = { "COLD DRINK":1, "HOT DRINK":2, WINGS:4, SIDES:4, DESSERT:4, PIZZA:9, BURGER:10, BREAKFAST:9, CLASSIC:12, CURRY:8, CHICKEN:9, DELI:6, JACKET:7, SALAD:5 };
const OVERRIDES = {
  "Pint of Guinness":{ speed:5 }, "Monster Energy":{ speed:1 }, "Glass of Tap Water":{ speed:1 },
  "Large Breakfast":{ speed:12 }, "The Empire State":{ speed:13 }, "Gravy":{ speed:2, mess:4 },
  "Chips with Curry Sauce":{ mess:9 }, "Freshly Battered Fish & Chips":{ speed:12 },
  "Steak & Ale Pudding":{ speed:10 }, "Porridge":{ speed:3 }, "Eggs Benedict":{ speed:11 },
  "Mushy Peas":{ mess:4 }, "Pint of Guest Ale":{ speed:5 },
};
CARDS.forEach(c => {
  const o = OVERRIDES[c.name] || {};
  c.mess = clamp10(Math.round(c.kcal / 1883 * 5 + c.grease * 0.5 + (MESS_BASE[c.cat] || 0)));
  if (o.mess !== undefined) c.mess = clamp10(o.mess);
  const jit = (hashStr(c.name) % 3) - 1;
  c.speed = Math.max(1, Math.min(13, (o.speed !== undefined ? o.speed : (SPEED_BASE[c.cat] || 5)) + jit));
});

const CAT_LABEL = { BREAKFAST:"BREAKFAST", BURGER:"BURGER", PIZZA:"PIZZA", CURRY:"CURRY", CHICKEN:"CHICKEN", CLASSIC:"PUB CLASSIC", DELI:"DELI", JACKET:"JACKET SPUD", SALAD:"SALAD/NOODLES", WINGS:"WINGS", SIDES:"SIDE/SMALL", DESSERT:"DESSERT", "HOT DRINK":"HOT DRINK", "COLD DRINK":"DRINK" };

// A stat: higherWins → big wins; false → small wins. get(card) → number.
const STATS = [
  { key:"kcal",   label:"KCAL",         higherWins:true,  max:1900, fmt:v => v + " kcal",           get:c => c.kcal },
  { key:"price",  label:"PRICE",        higherWins:false, max:13,   fmt:v => v === 0 ? "FREE" : "£" + v.toFixed(2), get:c => c.price },
  { key:"grease", label:"GREASE",       higherWins:true,  max:10,   fmt:v => v + "/10",             get:c => c.grease },
  { key:"hang",   label:"HANGOVER CURE",higherWins:true,  max:10,   fmt:v => v + "/10",             get:c => c.hang },
  { key:"regret", label:"REGRET",       higherWins:false, max:10,   fmt:v => v + "/10",             get:c => c.regret },
  { key:"carpet", label:"CARPET MATCH", higherWins:true,  max:10,   fmt:v => v + "/10",             get:c => c.carpet },
];
const statByKey = key => STATS.find(s => s.key === key);

/* ==================== 2. AUDIO (synthesized, no files) ==================== */
/* 0.1s of silence as a data URI — keeps an <audio> media session alive on iOS,
   bypassing the physical silent switch for WebAudio. */
const FART_FILES = ["sfx/fart-alt.mp3", "sfx/fart-bad-chili.mp3", "sfx/fart-chair.mp3", "sfx/fart-computer.mp3", "sfx/fart-crazy.mp3", "sfx/fart-innocent.mp3", "sfx/fart-pig.mp3", "sfx/fart-push.mp3", "sfx/fart-real.mp3", "sfx/fart-reverb.mp3", "sfx/fart-s1.mp3", "sfx/fart-s2.mp3", "sfx/fart-s3.mp3", "sfx/fart-s4.mp3", "sfx/fart-s5.mp3", "sfx/fart-trumpet.mp3", "sfx/fart-wav506.mp3"];
const SILENT_WAV = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
const AudioFX = (() => {
  let ctx = null;
  let muted = false, musicOn = true;
  try { muted = localStorage.getItem("spoons.mute") === "1"; } catch(e){}
  try { musicOn = localStorage.getItem("spoons.music") !== "0"; } catch(e){}
  let musicTimer = null, musicStep = 0;
  let mediaAudio = null;
  const FART_POOL = [];
  function preloadFarts(){
    if (FART_POOL.length || !FART_FILES.length) return;
    FART_FILES.forEach(src => { try { const a = new Audio(src); a.preload = "auto"; a.load(); FART_POOL.push(a); } catch(e){} });
  }
  let fartAudio = null;
  function ac(){
    if (!ctx){ try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }
  function silentKick(){
    /* iOS/Safari only fully arms audio when a sound is triggered synchronously inside
       the user gesture. Play a zero-length silent buffer to unlock the context. */
    const c = ac(); if (!c) return;
    try {
      const buf = c.createBuffer(1, 1, c.sampleRate);
      const s = c.createBufferSource(); s.buffer = buf;
      s.connect(c.destination); s.start(0);
    } catch (e) {}
  }
  function tone(freq, dur, type, vol, when){
    const c = ac(); if (!c || muted) return;
    const t = c.currentTime + (when || 0);
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || "square"; o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol || 0.06, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function noise(dur, vol, when){
    const c = ac(); if (!c || muted) return;
    const t = c.currentTime + (when || 0);
    const len = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const s = c.createBufferSource(); s.buffer = buf;
    const g = c.createGain(); g.gain.setValueAtTime(vol || 0.05, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(g); g.connect(c.destination);
    s.start(t);
  }
  /* --- 8-bit catchy pub-arcade theme: G major, 150 BPM.
     4 channels data-driven, 128 steps (8 bars) in AABA form.
     Real progression: G (I) -> D (V) -> C (IV) -> G, with a ii-V-I turn (Am7-D7-G).
     Every step creates short-lived nodes that stop automatically. --- */
  const BPM = 150;
  const STEP_MS = Math.round((60 / BPM) * 1000 / 4); // 16th-note at 150 BPM = 100 ms
  // Note frequencies (A4 = 440)
  const N = {
    G2: 98.00, A2: 110.00, B2: 123.47, C3: 130.81, D3: 146.83, E3: 164.81, Fs3: 185.00,
    G3: 196.00, A3: 220.00, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63,
    Fs4: 369.99, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25, D5: 587.33,
    E5: 659.25, Fs5: 739.99, G5: 783.99, A5: 880.00
  };
  // 128-step loop = 8 bars. Form: A (0-31), A (32-63), B (64-95), A' (96-127).
  const BASS = [
    N.G2, N.G2, N.B2, N.D3, 0, N.G2, N.B2, N.D3,
    N.G2, N.G2, N.B2, N.D3, 0, N.D3, N.B2, N.G2,
    N.D3, N.D3, N.Fs3, N.A3, 0, N.D3, N.Fs3, N.A3,
    N.D3, N.D3, N.Fs3, N.A3, N.C3, N.B2, N.A2, N.G2,
    N.C3, N.C3, N.E3, N.G3, 0, N.C3, N.E3, N.G3,
    N.C3, N.C3, N.E3, N.G3, N.A2, N.B2, N.C3, N.D3,
    N.G2, N.G2, N.B2, N.D3, 0, N.G2, N.B2, N.D3,
    N.G2, N.A2, N.B2, N.C3, N.D3, N.G3, N.B2, N.G2,
    N.G2, N.B2, N.D3, N.B2, N.G2, N.B2, N.D3, N.B2,
    N.G2, N.B2, N.D3, N.B2, N.G2, N.D3, N.B2, N.G2,
    N.D3, N.Fs3, N.A3, N.Fs3, N.D3, N.Fs3, N.A3, N.Fs3,
    N.D3, N.Fs3, N.A3, N.C4, N.B3, N.A3, N.G3, N.Fs3,
    N.C3, N.E3, N.G3, N.E3, N.C3, N.E3, N.G3, N.E3,
    N.C3, N.E3, N.G3, N.E3, N.D3, N.C3, N.B2, N.A2,
    N.G2, N.B2, N.D3, N.G3, N.D3, N.B2, N.G2, N.B2,
    N.D3, N.G3, N.B3, N.D4, N.G2, N.B2, N.D3, N.G3
  ];
  const LEAD = [
    N.G4, 0, N.B4, 0, N.D5, 0, N.B4, N.G4,
    N.B4, 0, N.D5, 0, N.G5, 0, N.D5, N.B4,
    N.A4, 0, N.C5, 0, N.E5, 0, N.C5, N.A4,
    N.C5, 0, N.E5, 0, N.A5, 0, 0, 0,
    N.B4, 0, N.D5, 0, N.G5, 0, N.D5, N.B4,
    N.D5, 0, N.G5, 0, N.B5, 0, 0, 0,
    N.C5, 0, N.B4, 0, N.A4, 0, N.G4, N.Fs4,
    N.G4, N.A4, N.B4, N.C5, N.D5, N.B4, N.G4, 0,
    N.G5, 0, N.G5, 0, N.Fs5, N.G5, N.A5, N.G5,
    N.D5, 0, N.D5, 0, N.E5, N.D5, N.B4, N.G4,
    N.A4, 0, N.A4, 0, N.B4, N.A4, N.Fs4, N.D4,
    N.A4, 0, N.B4, 0, N.C5, N.B4, N.A4, N.G4,
    N.G4, 0, N.G4, 0, N.Fs4, N.G4, N.A4, N.G4,
    N.E4, 0, N.E4, 0, N.Fs4, N.E4, N.D4, N.B3,
    N.D4, 0, N.G4, 0, N.B4, 0, N.G4, N.D4,
    N.G4, N.A4, N.B4, N.C5, N.D5, N.G5, N.B4, N.G4
  ];
  const ARP = [
    N.G4, N.B4, N.D5, N.B4, N.G4, N.B4, N.D5, N.B4,
    N.G4, N.B4, N.D5, N.B4, N.G4, N.D5, N.B4, N.G4,
    N.A4, N.C5, N.E5, N.C5, N.A4, N.C5, N.E5, N.C5,
    N.A4, N.C5, N.E5, N.C5, N.A4, N.C5, N.E5, N.C5,
    N.B4, N.D5, N.G5, N.D5, N.B4, N.D5, N.G5, N.D5,
    N.B4, N.D5, N.G5, N.D5, N.B4, N.D5, N.G5, N.D5,
    N.C5, N.E5, N.G5, N.E5, N.C5, N.E5, N.G5, N.E5,
    N.D5, N.C5, N.B4, N.A4, N.G4, N.Fs4, N.G4, N.A4,
    N.G4, N.B4, N.D5, N.B4, N.G4, N.B4, N.D5, N.B4,
    N.G4, N.B4, N.D5, N.B4, N.G4, N.B4, N.D5, N.B4,
    N.A4, N.C5, N.E5, N.C5, N.A4, N.C5, N.E5, N.C5,
    N.A4, N.C5, N.E5, N.C5, N.A4, N.C5, N.E5, N.C5,
    N.B4, N.D5, N.G5, N.D5, N.B4, N.D5, N.G5, N.D5,
    N.B4, N.D5, N.G5, N.D5, N.B4, N.D5, N.G5, N.D5,
    N.C5, N.E5, N.G5, N.E5, N.C5, N.E5, N.G5, N.E5,
    N.C5, N.E5, N.G5, N.E5, N.C5, N.D5, N.B4, N.G4
  ];
  const DRUMS = {
    kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    hat:   [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
    snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
  };
  function musicTick(){
    if (!musicOn || muted) return;
    const i = musicStep % 128;
    if (BASS[i]) tone(BASS[i], 0.18, "triangle", 0.05);
    if (LEAD[i]) tone(LEAD[i], 0.11, "square", 0.04);
    if (ARP[i])  tone(ARP[i],  0.08, "square", 0.018);
    if (DRUMS.kick[i])  tone(55, 0.12, "triangle", 0.08);
    if (DRUMS.hat[i])   noise(0.035, 0.02);
    if (DRUMS.snare[i]) noise(0.07, 0.035);
    musicStep++;
  }
function startMusic(){
    stopMusic();
    if (!musicOn || muted) return;
    const c = ac(); if (!c) return;
    musicTimer = setInterval(musicTick, STEP_MS);
  }
  function stopMusic(){ if (musicTimer){ clearInterval(musicTimer); musicTimer = null; } }
  function resumeMusic(){ if (musicOn && !muted && !musicTimer) startMusic(); }
  return {
    unlock(){
      ac(); silentKick(); preloadFarts();
      // iOS: the physical silent switch silences WebAudio unless the page holds an
      // active <audio> media session. Open a silent looping one inside the first gesture.
      try {
        if (!mediaAudio || mediaAudio.__failed){
          const a = document.createElement("audio");
          a.src = SILENT_WAV;
          a.loop = true; a.volume = 0.001; a.muted = false;
          a.setAttribute("playsinline", "");
          a.addEventListener("playing", function once(){
            a.removeEventListener("playing", arguments.callee);
            mediaAudio = a;
          });
          const p = a.play();
          if (p && p.catch) p.catch(() => { mediaAudio = { __failed: true }; });
          mediaAudio = a;
        } else if (mediaAudio.paused){
          mediaAudio.play().catch(() => {});
        }
      } catch (e) {}
    },
    click(){ tone(220, 0.06, "square", 0.045); },
    deal(){ noise(0.09, 0.04); tone(160, 0.05, "triangle", 0.03, 0.02); },
    flip(){ tone(520, 0.05, "triangle", 0.04); tone(700, 0.05, "triangle", 0.035, 0.05); },
    win(streak){ streak = streak || 0; const base = 523 + Math.min(streak, 6) * 35; [base, base*1.26, base*1.5].forEach((f, i) => tone(f, 0.09, "square", 0.055, i * 0.07)); },
    lose(){ tone(196, 0.12, "square", 0.055); tone(131, 0.16, "square", 0.055, 0.1); },
    draw(){ tone(330, 0.1, "triangle", 0.055); },
    bacon(step){
      if (step >= 4){ this.fart(); return; } // 4+ streaks: the pig takes over
      const f = [659, 784, 880, 988][Math.min(step - 2, 3)] || 659; tone(f, 0.1, "square", 0.05); tone(f * 1.5, 0.12, "square", 0.04, 0.06);
    },
    fart(){
      // Fart pack: preloaded samples (CC0, fartsoundboard.com), random pick; synth fallback.
      try {
        if (!FART_POOL.length) throw new Error("no samples");
        const a = FART_POOL[Math.floor(Math.random() * FART_POOL.length)];
        a.currentTime = 0;
        a.volume = 0.9;
        const p = a.play();
        if (p && p.catch) p.catch(() => {});
        return;
      } catch (e) { /* fall through to synth */ }
      this.synthFart();
    },
    synthFart(){
      const c = ac(); if (!c || muted) return;
      const t = c.currentTime;
      // body: low sawtooth with pitch wobble (the classic brrip)
      const o = c.createOscillator(), g = c.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(95, t);
      for (let i = 0; i < 6; i++){
        o.frequency.linearRampToValueAtTime(70 + Math.random() * 60, t + 0.06 + i * 0.05);
      }
      o.frequency.linearRampToValueAtTime(50, t + 0.45);
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(0.16, t + 0.03);
      g.gain.setValueAtTime(0.14, t + 0.3);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      o.connect(g); g.connect(c.destination);
      o.start(t); o.stop(t + 0.52);
      // sputter: two short noise bursts on top
      noise(0.05, 0.09, 0.02);
      noise(0.07, 0.07, 0.22);
    },
    coin(){ tone(988, 0.07, "square", 0.055); tone(1319, 0.18, "square", 0.055, 0.07); },
    wave(){ [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.1, "square", 0.055, i * 0.09)); },
    boss(){ tone(82, 0.3, "sawtooth", 0.06); tone(78, 0.35, "sawtooth", 0.055, 0.25); },
    over(){ [392, 330, 262, 196].forEach((f, i) => tone(f, 0.14, "square", 0.055, i * 0.12)); },
    reward(){ [659, 784, 988, 1319, 1568].forEach((f, i) => tone(f, 0.12, "square", 0.055, i * 0.09)); },
    startMusic(){ startMusic(); },
    stopMusic(){ stopMusic(); },
    resumeMusic(){ resumeMusic(); },
    musicEnabled(){ return musicOn; },
    toggleMusic(){ musicOn = !musicOn; try { localStorage.setItem("spoons.music", musicOn ? "1" : "0"); } catch(e){} if (!musicOn) stopMusic(); else { silentKick(); startMusic(); } return musicOn; },
    toggleMute(){ muted = !muted; try { localStorage.setItem("spoons.mute", muted ? "1" : "0"); } catch(e){} if (muted) stopMusic(); else { silentKick(); startMusic(); } return muted; },
    isMuted(){ return muted; },
  };
})();

/* ==================== 2b. NET + ONLINE PVP ==================== */
const ROOM_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function genRoomCode(n){
  let s = "";
  for (let i = 0; i < n; i++) s += ROOM_ALPHABET[Math.floor(Math.random() * ROOM_ALPHABET.length)];
  return s;
}
function cleanCode(v){ return (v || "").toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/0/g, "O").replace(/1/g, "I").slice(0, 4); }

const ICE_CONFIG = { iceServers: [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
] };

let peerObj = null, connObj = null;
let msgHandler = null;
let disconnectHandler = null;
let myRoom = null;
let isHost = false;
let netBack = {
  get connected(){ return !!connObj && connObj.open; },
  get isHost(){ return isHost; },
  send(msg){ if (connObj && connObj.open){ connObj.send(msg); return true; } return false; },
  close(){
    try { if (connObj){ connObj.close(); } } catch (e){}
    try { if (peerObj){ peerObj.destroy(); } } catch (e){}
    connObj = null; peerObj = null; isHost = false; myRoom = null;
  },
};
const Net = {
  get connected(){ return netBack.connected; },
  get isHost(){ return netBack.isHost; },
  send(msg){ return netBack.send(msg); },
  onMessage(cb){ msgHandler = cb; },
  onDisconnect(cb){ disconnectHandler = cb; },
  close(){ return netBack.close(); },
};
window.__wireNet = function(impl){
  netBack = impl;
  impl.onMessage = function(m){ if (msgHandler) msgHandler(m); };
  impl.onDisconnect = function(){ if (disconnectHandler) disconnectHandler(); };
};

function setOnlineStatus(msg, ok){
  const st = document.getElementById("onlineStatus");
  if (!st) return;
  st.textContent = msg;
  st.style.color = ok ? "var(--green)" : "var(--red)";
}

function initPeer(code){
  if (typeof Peer === "undefined"){
    setOnlineStatus("PEERJS NOT LOADED — NEEDS INTERNET TO PLAY ONLINE", false);
    document.getElementById("roomCode").disabled = false;
    return null;
  }
  const id = "spoonstt-" + code;
  const p = new Peer(id, { config: ICE_CONFIG });
  peerObj = p;
  window.peerObj = p;
  p.on("error", err => {
    setOnlineStatus("ROOM ERROR: " + (err.message || err.type || err), false);
    if (err.type === "unavailable-id") Net.close();
  });
  return p;
}

function startHost(){
  Net.close();
  isHost = true;
  myRoom = genRoomCode(4);
  const link = location.origin + location.pathname + "?room=" + myRoom;
  const rc = document.getElementById("roomCode");
  if (rc) rc.value = myRoom;
  const lk = document.getElementById("onlineLink");
  if (lk) lk.textContent = link;
  const cp = document.getElementById("btnCopyLink");
  if (cp) cp.style.display = "";
  setOnlineStatus("WAITING FOR OPPONENT…", true);
  const p = initPeer(myRoom);
  if (!p) return;
  p.on("connection", c => {
    if (connObj){ c.close(); return; }
    connObj = c;
    window.connObj = c;
    wireConnection();
  });
}

function startJoin(code){
  Net.close();
  isHost = false;
  myRoom = cleanCode(code);
  if (myRoom.length !== 4){ setOnlineStatus("ENTER A 4-CHAR ROOM CODE", false); return; }
  const rc = document.getElementById("roomCode");
  if (rc) rc.value = myRoom;
  const lk = document.getElementById("onlineLink");
  if (lk) lk.textContent = "";
  const cp = document.getElementById("btnCopyLink");
  if (cp) cp.style.display = "none";
  setOnlineStatus("CONNECTING…", true);
  const p = initPeer(myRoom + "-guest-" + Math.floor(Math.random()*1e6));
  if (!p) return;
  p.on("open", () => {
    const c = p.connect("spoonstt-" + myRoom, { reliable: true });
    connObj = c;
    window.connObj = c;
    wireConnection();
  });
}

function wireConnection(){
  const c = connObj;
  if (!c) return;
  let handshakeDone = false;
  c.on("open", () => { c.send({ t:"hello", v:1 }); });
  c.on("data", msg => {
    if (!msg || typeof msg !== "object") return;
    if (!handshakeDone){
      if (msg.t === "hello" && msg.v === 1){
        handshakeDone = true;
        setOnlineStatus(isHost ? "OPPONENT JOINED" : "CONNECTED", true);
        if (isHost) startRemoteGame(); else joinRemoteGame();
        return;
      }
      setOnlineStatus("WRONG GAME VERSION — REFRESH", false);
      Net.close();
      return;
    }
    if (msgHandler) msgHandler(msg);
  });
  c.on("close", () => { if (disconnectHandler) disconnectHandler(); });
  c.on("error", err => { setOnlineStatus("CONNECTION LOST", false); if (disconnectHandler) disconnectHandler(); });
}

function openOnlinePanel(show){
  const panel = document.getElementById("onlinePanel");
  if (panel) panel.classList.toggle("hidden", !show);
}
function copyRoomLink(){
  const link = document.getElementById("onlineLink").textContent;
  if (link) navigator.clipboard.writeText(link).catch(() => {});
}

/* ==================== 2c. YOUR SPOONS pub overlay ==================== */
function escapeHtml(t){ return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
const Spoons = (() => {
  const LS_MY_PUB = "spoons.myPub";
  const LS_RECENT = "spoons.recentPubs";
  let pubsCache = null;
  let pubsPromise = null;
  let chunkMem = {};
  function myPub(){
    try { const v = localStorage.getItem(LS_MY_PUB); return v ? JSON.parse(v) : null; }
    catch(e){ return null; }
  }
  function recentPubs(){
    try { const v = localStorage.getItem(LS_RECENT); return v ? JSON.parse(v) : []; }
    catch(e){ return []; }
  }
  function setRecent(list){
    try { localStorage.setItem(LS_RECENT, JSON.stringify(list.slice(0, 3))); } catch(e){}
  }
  function pickPub(pub){
    try { localStorage.setItem(LS_MY_PUB, JSON.stringify(pub)); } catch(e){}
    const r = recentPubs().filter(p => p.s !== pub.s);
    r.unshift({s:pub.s, n:pub.n, f:pub.f});
    setRecent(r);
  }
  async function preloadMyPub(){
    const pub = myPub(); if (!pub) return;
    await loadChunk(pub.f);
  }
  function clearPub(){
    try { localStorage.removeItem(LS_MY_PUB); } catch(e){}
  }
  function loadPubs(){
    if (pubsCache) return pubsCache;
    if (pubsPromise) return pubsPromise;
    pubsPromise = (async () => {
      try {
        if (typeof fetch !== "function") throw new Error("no fetch");
        const r = await fetch("data/pubs.json");
        if (!r.ok) throw new Error("status " + r.status);
        pubsCache = await r.json();
      } catch(e){ pubsCache = []; }
      return pubsCache;
    })();
    return pubsPromise;
  }
  async function loadChunk(file){
    const cached = getChunkSync(file);
    if (cached) return cached;
    try {
      if (typeof fetch !== "function") throw new Error("no fetch");
      const r = await fetch("data/" + file);
      if (!r.ok) throw new Error("status " + r.status);
      const data = await r.json();
      chunkMem[file] = data;
      try { sessionStorage.setItem("spoons.chunk." + file, JSON.stringify(data)); } catch(e){}
      return data;
    } catch(e){
      if (!chunkMem[file]) chunkMem[file] = {};
      return {};
    }
  }
  function getChunkSync(file){
    if (chunkMem[file]) return chunkMem[file];
    try {
      const v = sessionStorage.getItem("spoons.chunk." + file);
      if (v){ const d = JSON.parse(v); chunkMem[file] = d; return d; }
    } catch(e){}
    return null;
  }
  function setChunkCache(file, data){ chunkMem[file] = data; }
  function restoreNational(){
    for (const c of CARDS){
      if (c.__orig){ c.price = c.__orig.price; c.kcal = c.__orig.kcal; }
    }
  }
  function applyOverlaySync(){
    const pub = myPub();
    if (!pub){ restoreNational(); return; }
    const chunk = getChunkSync(pub.f);
    if (!chunk || !chunk[pub.s]){ restoreNational(); return; }
    const map = chunk[pub.s];
    restoreNational();
    for (const c of CARDS){
      const o = map[c.name];
      if (o){
        if (c.__orig === undefined) c.__orig = { price:c.price, kcal:c.kcal };
        c.price = o[0]; c.kcal = o[1];
      }
    }
  }
  return { myPub, pickPub, clearPub, recentPubs, loadPubs, loadChunk, getChunkSync, setChunkCache, restoreNational, applyOverlaySync, preloadMyPub };
})();

let spoonsPubs = null;
function openSpoonsPanel(){
  const panel = el("spoonsPanel");
  if (!panel) return;
  panel.classList.remove("hidden");
  updateSpoonsHeader();
  if (!spoonsPubs){
    Spoons.loadPubs().then(list => { spoonsPubs = list; renderSpoonsList(); });
  }
  renderSpoonsList();
  const pub = Spoons.myPub();
  if (pub) Spoons.loadChunk(pub.f);
}
function closeSpoonsPanel(){ const p = el("spoonsPanel"); if (p) p.classList.add("hidden"); }
function updateSpoonsHeader(){
  const pub = Spoons.myPub();
  const st = el("spoonsStatus");
  if (!st) return;
  if (pub) st.innerHTML = 'YOUR SPOONS <b style="color:var(--gold);">' + escapeHtml(pub.n) + '</b> · <button class="linkbtn" id="btnSpoonsClear" style="color:var(--red);">CLEAR</button>';
  else st.textContent = "CHOOSE YOUR SPOONS";
}
function renderSpoonsList(){
  const q = (el("spoonsSearch").value || "").trim().toLowerCase();
  let recent = Spoons.recentPubs();
  let list = [];
  let countLabel = "";
  if (!q){
    const all = (spoonsPubs || []);
    const rset = new Set(recent.map(p => p.s));
    const rest = all.filter(p => !rset.has(p.s)).slice(0, Math.max(0, 50 - recent.length));
    list = recent.map(p => Object.assign({}, p, { recent:true })).concat(rest);
    countLabel = list.length + " PUBS";
  } else {
    const matches = (spoonsPubs || []).filter(p => p.n.toLowerCase().includes(q));
    const rset = new Set(matches.map(p => p.s));
    const rrecent = recent.filter(p => p.n.toLowerCase().includes(q) && !rset.has(p.s));
    list = rrecent.map(p => Object.assign({}, p, { recent:true })).concat(matches.slice(0, 50 - rrecent.length));
    countLabel = matches.length + " MATCHES";
  }
  el("spoonsCount").textContent = countLabel;
  el("spoonsList").innerHTML = list.map(p =>
    '<button class="spoons-item" data-slug="' + escapeHtml(p.s) + '" data-file="' + escapeHtml(p.f) + '" data-name="' + escapeHtml(p.n) + '">' +
    (p.recent ? '<span style="color:var(--gold);margin-right:4px;">★</span>' : '') + escapeHtml(p.n) +
    "</button>").join("");
}
function onSpoonsItemClick(e){
  const b = e.target.closest(".spoons-item");
  if (!b) return;
  const pub = { s:b.dataset.slug, n:b.dataset.name, f:b.dataset.file };
  Spoons.pickPub(pub);
  updateSpoonsHeader();
  updatePlayingAt();
  ensureSignup();
  closeSpoonsPanel();
  AudioFX.click();
  Spoons.loadChunk(pub.f);
}
function setBoardTab(tab){
  ["tabGlobal", "tabPub", "tabPubPlayer"].forEach(id => document.getElementById(id).classList.toggle("on", false));
  document.getElementById(tab === "global" ? "tabGlobal" : tab === "pub" ? "tabPub" : "tabPubPlayer").classList.add("on");
  renderBoards(tab);
}
function updatePlayingAt(){
  const pub = Spoons.myPub();
  const line = el("playingAt");
  if (!line) return;
  if (pub){ line.textContent = "PLAYING AT " + pub.n.toUpperCase(); line.style.display = ""; }
  else { line.style.display = "none"; }
}

/* ============ BOARDS: shared leaderboard (players update it from any device) ============
   Store: crudcrud.com namespace (keyless, CORS *). Single doc holds all players.
   Player record: { elo, wins, losses, streak, pub, games, bigSpoon, updated }.
   Flow: signup once (handle + local) -> after every finished game, submit result.
   Fail-soft: any network error = boards show local cache, game never blocks.
   NOTE (MVP): store is a free tier — data is demo-grade, last-write-wins on races.
   Swap BOARD_NS/BOARD_API for a Supabase/Cloudflare edge when Spoons bite. */

const BOARD_NS = "98a36877c84d487ea8884e04c024e399";
const BOARD_API = "https://crudcrud.com/api/" + BOARD_NS + "/board";
const LS_BOARD_ME = "spoons.me";
const LS_BOARD_CACHE = "spoons.boardCache";
let boardCache = null;      // last known players map
let submitting = false;

function me(){
  try { const v = localStorage.getItem(LS_BOARD_ME); return v ? JSON.parse(v) : null; }
  catch(e){ return null; }
}
function isSignedUp(){ return !!me(); }

async function boardRead(){
  try {
    if (typeof fetch !== "function") throw new Error("no fetch");
    const r = await fetch(BOARD_API, { cache: "no-store" });
    if (!r.ok) throw new Error("status " + r.status);
    const items = await r.json();
    const doc = Array.isArray(items) && items[0] && items[0].players ? items[0] : null;
    if (!doc) throw new Error("no doc");
    boardCache = doc;
    try { localStorage.setItem(LS_BOARD_CACHE, JSON.stringify(doc)); } catch(e){}
    return doc;
  } catch(e){
    try { const v = localStorage.getItem(LS_BOARD_CACHE); return v ? JSON.parse(v) : { players: {} }; }
    catch(e2){ return { players: {} }; }
  }
}

async function boardWrite(doc){
  const items = await (await fetch(BOARD_API, { cache: "no-store" })).json();
  const cur = Array.isArray(items) && items[0] ? items[0] : null;
  if (!cur || !cur._id) throw new Error("no doc");
  const r = await fetch(BOARD_API + "/" + cur._id, {
    method: "PUT", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: "main", players: doc.players, pubs: doc.pubs || {} })
  });
  if (!r.ok) throw new Error("write " + r.status);
  return true;
}

/* Submit my result after a finished game. Retries up to 3x with re-read (race-safe-ish). */
async function boardSubmit(result){
  const m = me(); if (!m || submitting) return false;
  submitting = true;
  try {
    for (let attempt = 0; attempt < 3; attempt++){
      const doc = await boardRead();
      const players = doc.players || {};
      const p = players[m.name] || { elo: 1200, wins: 0, losses: 0, streak: 0, games: 0, pub: m.pub, bigSpoon: false };
      const expected = result.expectedElo || p.elo;
      const k = 24;
      p.elo = Math.max(400, Math.round(p.elo + k * ((result.win ? 1 : 0) - 1 / (1 + Math.pow(10, (expected - p.elo) / 400)))));
      if (result.win){ p.wins++; p.streak = (p.streak || 0) + 1; } else { p.losses++; p.streak = 0; }
      p.games = (p.games || 0) + 1;
      p.pub = m.pub;
      p.updated = Date.now();
      const pubs = doc.pubs || {};
      const key = (m.pub || "unknown").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "unknown";
      const pb = pubs[key] || { name: m.pub || "Unknown", games: 0, topElo: 0 };
      pb.games++;
      if (p.elo > pb.topElo) pb.topElo = p.elo;
      pubs[key] = pb;
      const next = { players: Object.assign({}, players, { [m.name]: p }), pubs };
      // cap the doc: top 120 by elo + always me
      const entries = Object.entries(next.players);
      if (entries.length > 130){
        entries.sort((a, b) => (b[1].elo || 0) - (a[1].elo || 0));
        const keep = new Set(entries.slice(0, 120).map(e => e[0])); keep.add(m.name);
        next.players = Object.fromEntries(entries.filter(e => keep.has(e[0])));
      }
      try {
        await boardWrite(next);
        boardCache = next;
        try { localStorage.setItem(LS_BOARD_CACHE, JSON.stringify(next)); } catch(e){}
        return true;
      } catch(e){ /* retry */ }
    }
    return false;
  } finally { submitting = false; }
}

/* ---- signup UI ---- */
function ensureSignup(){
  const panel = document.getElementById("signupPanel");
  if (!panel) return;
  panel.style.display = isSignedUp() ? "none" : "";
}
function doSignup(){
  const nEl = document.getElementById("signupName");
  const pEl = document.getElementById("signupPub");
  const name = (nEl.value || "").trim().toUpperCase();
  const pub = (pEl.value || "").trim();
  if (name.length < 3 || name.length > 8){ nEl.focus(); return; }
  if (pub.length < 3 || pub.length > 24){ pEl.focus(); return; }
  const m = { name, pub, since: Date.now() };
  try { localStorage.setItem(LS_BOARD_ME, JSON.stringify(m)); } catch(e){}
  ensureSignup();
  AudioFX.coin();
  renderBoards("global");
}

/* ---- boards UI ---- */
function boardsTitleFor(tab){
  return tab === "global" ? "WORLD TOP 20" : tab === "pub" ? "TOP SPOONS PUBS" : "PLAYERS AT MY SPOONS";
}
async function renderBoards(tab){
  const list = document.getElementById("boardsList");
  const status = document.getElementById("boardsStatus");
  const m = me();
  if (!list) return;
  status.textContent = "PULLING THE BOARD…";
  const doc = await boardRead();
  const players = doc.players || {};
  const pubs = doc.pubs || {};
  list.textContent = "";
  if (tab === "global"){
    const rows = Object.entries(players).sort((a, b) => (b[1].elo || 0) - (a[1].elo || 0)).slice(0, 20);
    if (!rows.length){ status.textContent = m ? "NO SCORES YET — GO SET THE PACE" : "NO SCORES YET"; return; }
    rows.forEach(([nm, p], i) => {
      const row = document.createElement("div");
      row.className = "boards-row" + (m && nm === m.name ? " me" : "");
      const rk = document.createElement("span"); rk.className = "boards-rank"; rk.textContent = String(i + 1);
      const nwrap = document.createElement("span"); nwrap.className = "boards-name";
      nwrap.textContent = nm + (p.streak >= 3 ? " 🔥" : "") + (p.bigSpoon ? " 🥄" : "");
      const sub = document.createElement("span"); sub.className = "boards-sub";
      sub.textContent = (p.pub || "?") + " · " + (p.wins || 0) + "W" + (p.losses ? "-" + p.losses : "");
      nwrap.appendChild(sub);
      const e = document.createElement("span"); e.className = "boards-elo"; e.textContent = String(p.elo || 1200);
      row.append(rk, nwrap, e);
      list.appendChild(row);
    });
    status.textContent = rows.length + " PLAYERS RANKED";
  } else if (tab === "pub"){
    const rows = Object.entries(pubs).sort((a, b) => (b[1].games || 0) - (a[1].games || 0)).slice(0, 20);
    if (!rows.length){ status.textContent = "NO PUBS ON THE BOARD YET"; return; }
    rows.forEach(([key, pb], i) => {
      const row = document.createElement("div");
      row.className = "boards-row";
      const rk = document.createElement("span"); rk.className = "boards-rank"; rk.textContent = String(i + 1);
      const nwrap = document.createElement("span"); nwrap.className = "boards-name"; nwrap.textContent = pb.name || key;
      const sub = document.createElement("span"); sub.className = "boards-sub";
      sub.textContent = (pb.games || 0) + " GAMES";
      nwrap.appendChild(sub);
      const e = document.createElement("span"); e.className = "boards-elo"; e.textContent = String(pb.topElo || 0);
      row.append(rk, nwrap, e);
      list.appendChild(row);
    });
    status.textContent = rows.length + " PUBS PLAYING";
  } else {
    if (!m){ status.textContent = "SIGN UP FIRST — NAME YOUR LOCAL"; return; }
    const mine = Object.entries(players).filter(([, p]) => (p.pub || "").toLowerCase() === m.pub.toLowerCase())
      .sort((a, b) => (b[1].elo || 0) - (a[1].elo || 0)).slice(0, 20);
    if (!mine.length){ status.textContent = "NO ONE AT " + m.pub.toUpperCase() + " YET — YOU'RE FIRST"; return; }
    mine.forEach(([nm, p], i) => {
      const row = document.createElement("div");
      row.className = "boards-row" + (nm === m.name ? " me" : "");
      const rk = document.createElement("span"); rk.className = "boards-rank"; rk.textContent = String(i + 1);
      const nwrap = document.createElement("span"); nwrap.className = "boards-name";
      nwrap.textContent = nm + (p.streak >= 3 ? " 🔥" : "") + (p.bigSpoon ? " 🥄" : "");
      const sub = document.createElement("span"); sub.className = "boards-sub";
      sub.textContent = (p.wins || 0) + "W-" + (p.losses || 0) + "L";
      nwrap.appendChild(sub);
      const e = document.createElement("span"); e.className = "boards-elo"; e.textContent = String(p.elo || 1200);
      row.append(rk, nwrap, e);
      list.appendChild(row);
    });
    const myRow = mine.findIndex(([nm]) => nm === m.name);
    status.textContent = myRow >= 0 ? "YOU'RE #" + (myRow + 1) + " AT " + m.pub.toUpperCase() : "PLAY YOUR FIRST GAME TO ENTER";
  }
}

/* Hook: called from endGame (and duel finish) with the player's result. */
function submitMyResult(win){
  const m = me(); if (!m) return;
  boardSubmit({ win: !!win, expectedElo: 1200 }).then(ok => {
    if (ok && typeof renderBoards === "function") { /* boards refresh on open */ }
  });
}


function startRemoteGame(){
  game.demo = false; el("demoChip").style.display = "none";
  game.mode = "pvp";
  startGame("pvp");
  // re-arm remote AFTER startGame — startGame resets to a clean local state
  game.pvp.remote = true;
  game.pvp.role = "host";
  game.pvp.room = myRoom;
  sendSnapshot();
}
function joinRemoteGame(){
  game.demo = false; el("demoChip").style.display = "none";
  game.mode = "pvp";
  startGame("pvp");
  game.pvp.remote = true;
  game.pvp.role = "guest";
  game.pvp.room = myRoom;
  game.pvp.ready = false;
  showScreen("table");
}

function sendSnapshot(){
  Net.send({
    t:"snap",
    playerDeck: game.playerDeck, aiDeck: game.aiDeck, pot: game.pot,
    playerCard: game.playerCard, aiCard: game.aiCard,
    picker: game.pvp.picker, captures: game.pvp.captures,
    phase: game.phase, statKey: game.statKey, matchWinner: game.pvp.matchWinner,
  });
}

function applySnap(s){
  game.playerDeck = s.playerDeck || [];
  game.aiDeck = s.aiDeck || [];
  game.pot = s.pot || [];
  game.playerCard = s.playerCard || null;
  game.aiCard = s.aiCard || null;
  game.pvp.picker = s.picker || "p1";
  game.pvp.captures = s.captures || { p1:0, p2:0 };
  game.phase = s.phase || "play";
  game.statKey = s.statKey || null;
  game.pvp.matchWinner = s.matchWinner || null;
  game.turnOwner = game.pvp.picker === "p1" ? "player" : "ai";
  renderRemoteState(true);
  if (game.phase === "over") endRemoteGame();
}

function broadcastRound(){
  if (!Net.isHost) return;
  const guestOwnCard = game.pvp.picker === "p1" ? game.aiCard : game.playerCard;
  const opponentCard = game.pvp.picker === "p1" ? game.playerCard : game.aiCard;
  const opponentHidden = game.phase === "play";
  const pickerIsYou = game.pvp.picker === "p2";
  Net.send({
    t:"round",
    guestCard: opponentCard,
    guestOwnCard: guestOwnCard,
    opponentHidden: opponentHidden,
    pickerIsYou: pickerIsYou,
    captures: { you: game.pvp.captures.p2, opp: game.pvp.captures.p1 },
    pot: game.pot.length,
    verdictText: document.getElementById("verdict").innerHTML,
    phase: game.phase,
    statKey: game.statKey,
    streak: game.streak,
    winner: game.lastRemoteWinner,
  });
}

function sendOver(){
  if (!Net.isHost) return;
  const title = game.pvp.matchWinner === "p1" ? "PLAYER 1 WINS THE MATCH" : "PLAYER 2 WINS THE MATCH";
  Net.send({ t:"over", winner: game.pvp.matchWinner, captures: { you: game.pvp.captures.p2, opp: game.pvp.captures.p1 }, title: title });
}

let guestReady = false;
let hostReady = false;
function onGuestMessage(msg){
  if (msg.t === "pick"){
    if (game.phase !== "play" || game.pvp.picker !== "p2") return;
    game.statKey = msg.stat;
    resolveRound();
  } else if (msg.t === "next"){
    guestReady = true;
    checkProceed();
  } else if (msg.t === "rematch"){
    hostRematch();
  }
}
function checkProceed(){
  if (!Net.isHost) return;
  if (hostReady && guestReady){
    hostReady = false; guestReady = false;
    beginRound();
  }
}
function hostRematch(){
  hostReady = false; guestReady = false;
  startGame("pvp");
  sendSnapshot();
}

function guestPick(statKey){
  if (game.phase !== "play" || game.pvp.picker !== "p2" || game.pvp.role !== "guest") return;
  Net.send({ t:"pick", stat: statKey });
}
function guestNext(){
  if (game.pvp.role !== "guest") return;
  Net.send({ t:"next" });
}
function guestRematch(){
  Net.send({ t:"rematch" });
  if (!Net.isHost){
    game.pvp.matchWinner = null;
    game.phase = "title";
  }
}

function onHostMessage(msg){
  if (msg.t === "snap") applySnap(msg);
  else if (msg.t === "round") applyRound(msg);
  else if (msg.t === "over") applyOver(msg);
}

function applyRound(r){
  game.aiCard = r.guestCard;
  if (r.guestOwnCard) game.playerCard = r.guestOwnCard;
  game.pvp.captures = { p1: r.captures.opp, p2: r.captures.you };
  game.phase = r.phase;
  game.statKey = r.statKey || null;
  game.turnOwner = r.pickerIsYou ? "ai" : "player";
  game.pvp.picker = r.pickerIsYou ? "p2" : "p1";
  game.lastRemoteWinner = r.winner || null;
  renderRemoteState(r.opponentHidden);
  document.getElementById("verdict").innerHTML = r.verdictText || "";
  if (game.phase === "reveal"){
    const streak = parseInt(r.streak, 10) || 0;
    if (r.winner === "player"){ AudioFX.win(streak); if (streak >= 2) AudioFX.bacon(streak); }
    else if (r.winner === "ai") AudioFX.lose();
    else AudioFX.draw();
  }
}

function renderRemoteState(opponentHidden){
  renderHud();
  const guestPicker = game.pvp.picker === "p2";
  document.getElementById("sideLabelPlayer").textContent = guestPicker ? "PICK A STAT" : "YOUR CARD";
  document.getElementById("sideLabelAi").textContent = "OPPONENT — FACE DOWN";
  if (game.playerCard){
    renderPlayerCard({ pickable: game.phase === "play" && !guestPicker, deal: true });
  }
  if (game.aiCard){
    if (opponentHidden || game.phase === "play") renderAiBack();
    else {
      document.getElementById("aiCard").innerHTML = cardFaceHTML(game.aiCard, { locked: true, selectedKey: game.statKey });
      const card = document.getElementById("aiCard").querySelector(".card");
      if (card) card.classList.add("reveal");
    }
  }
  if (game.phase === "reveal" && game.statKey){
    const winner = game.lastRemoteWinner;
    highlightStats(game.statKey, winner === "draw" ? "draw" : winner);
  }
  if (game.phase === "reveal") renderRemoteNextButton();
  else clearActions();
}

function renderRemoteNextButton(){
  document.getElementById("roundActions").innerHTML = '<button id="btnNext" class="btn btn-cream">NEXT CARD</button>';
  document.getElementById("btnNext").addEventListener("click", () => {
    if (game.pvp.role === "host"){ hostReady = true; checkProceed(); }
    else guestNext();
  });
}

function applyOver(o){
  game.pvp.matchWinner = o.winner;
  endRemoteGame(o.title);
}

function endRemoteGame(title){
  game.phase = "over";
  AudioFX.stopMusic();
  const t = title || (game.pvp.matchWinner === "p1" ? "PLAYER 1 WINS THE MATCH" : "PLAYER 2 WINS THE MATCH");
  const titleEl = document.getElementById("overTitle");
  titleEl.textContent = t;
  titleEl.className = game.pvp.matchWinner === "p2" ? "win" : "lose";
  document.getElementById("overScore").innerHTML =
    "P1 CAPTURES <b>" + game.pvp.captures.p1 + "</b> · P2 CAPTURES <b>" + game.pvp.captures.p2 + "</b>";
  document.getElementById("overStats").textContent = "";
  document.getElementById("leaderboard").textContent = "";
  document.getElementById("initialsForm").classList.remove("open");
  const rematchBtn = document.getElementById("btnRematch");
  const overBtn = document.getElementById("btnOverMenu");
  const newRematch = rematchBtn.cloneNode(true);
  const newMenu = overBtn.cloneNode(true);
  rematchBtn.parentNode.replaceChild(newRematch, rematchBtn);
  overBtn.parentNode.replaceChild(newMenu, overBtn);
  newRematch.addEventListener("click", () => { if (game.pvp.role === "guest") guestRematch(); else hostRematch(); });
  newMenu.addEventListener("click", () => { Net.close(); refreshBests(); showScreen("title"); });
  showScreen("over");
  AudioFX.over();
}

function onDisconnect(){
  if (game.phase === "title"){ openOnlinePanel(false); return; }
  game.phase = "over";
  AudioFX.stopMusic();
  setVerdict('<div class="verdict-line lose">OPPONENT LEFT THE PUB</div>');
  const titleEl = document.getElementById("overTitle");
  titleEl.textContent = "OPPONENT LEFT THE PUB";
  titleEl.className = "lose";
  document.getElementById("overScore").textContent = "";
  document.getElementById("overStats").textContent = "";
  document.getElementById("leaderboard").textContent = "";
  document.getElementById("initialsForm").classList.remove("open");
  const rematchBtn = document.getElementById("btnRematch");
  if (rematchBtn) rematchBtn.style.display = "none";
  const overBtn = document.getElementById("btnOverMenu");
  if (overBtn) overBtn.textContent = "BACK TO TITLE";
  showScreen("over");
  AudioFX.lose();
}


/* ==================== 3. ENGINE ==================== */
function mulberry32(seed){
  return function(){
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seedForDuel(){ return Math.floor(Date.now() / 60000); }
function shuffle(arr){
  const rng = game && game.rng ? game.rng : Math.random;
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function drawFromBagRng(n, rng){
  rng = rng || (game && game.rng ? game.rng : Math.random);
  const out = [];
  for (let i = 0; i < n; i++){
    if (!game.bag.length) refillBagRng(rng);
    if (!game.bag.length) break;
    out.push(game.bag.pop());
  }
  return out;
}
function refillBagRng(rng){
  rng = rng || (game && game.rng ? game.rng : Math.random);
  const inPlay = new Set([...game.playerDeck, ...game.aiDeck, ...game.pot]);
  let fresh = CARDS.filter(c => !inPlay.has(c)).slice();
  for (let i = fresh.length - 1; i > 0; i--){
    const j = Math.floor(rng() * (i + 1));
    [fresh[i], fresh[j]] = [fresh[j], fresh[i]];
  }
  if (!fresh.length){ fresh = CARDS.slice(); for (let i = fresh.length - 1; i > 0; i--){ const j = Math.floor(rng() * (i + 1)); [fresh[i], fresh[j]] = [fresh[j], fresh[i]]; } }
  game.bag = fresh;
}
// +1 player, -1 ai, 0 draw
function compareStat(playerCard, aiCard, statKey){
  const st = statByKey(statKey);
  const a = st.get(playerCard), b = st.get(aiCard);
  if (a === b) return 0;
  return (st.higherWins ? a > b : a < b) ? 1 : -1;
}

// AI percentile per stat: precomputed sorted values + binary search rank
const PERC = (() => {
  const out = {};
  for (const st of STATS){
    const vals = CARDS.map(c => st.get(c)).sort((a, b) => a - b);
    out[st.key] = { vals: vals, range: Math.max(1, vals[vals.length - 1] - vals[0]) };
  }
  return out;
})();
function percentile(statKey, value){
  const p = PERC[statKey], vals = p.vals;
  let lo = 0, hi = vals.length;
  while (lo < hi){ const mid = (lo + hi) >> 1; if (vals[mid] < value) lo = mid + 1; else hi = mid; }
  return lo / vals.length;
}

// AI levels: 0 Punter (random) · 1 Regular (own best stat, 20% noise) · 2 Landlord (counters player's favourite stats)
const AI_NAMES = ["PUNTER", "REGULAR", "THE LANDLORD"];
const AI_THINKING = ["THE SPOONS IS LOOKING…", "THE SPOONS SQUINTS AT ITS CARD…", "THE SPOONS STROKES ITS CHIN…", "THE SPOONS TAKES ITS TIME…", "THE SPOONS ENJOYS THIS…"];
function aiChooseStat(aiCard, level){
  const rng = game && game.rng ? game.rng : Math.random;
  if (level === 0 || rng() < 0.08) return STATS[Math.floor(rng() * STATS.length)].key;
  if (level === 2 && Object.keys(game.pickHistory).length){
    const fav = Object.entries(game.pickHistory).sort((a, b) => b[1] - a[1])[0];
    if (fav && fav[1] >= 3 && percentile(fav[0], statByKey(fav[0]).get(aiCard)) >= 0.45) return fav[0];
  }
  let best = STATS[0], bestP = -1;
  for (const st of STATS){
    const p = percentile(st.key, st.get(aiCard));
    const eff = st.higherWins ? p : 1 - p;
    if (eff > bestP){ bestP = eff; best = st; }
  }
  return best.key;
}

/* ==================== 4. STATE + MODES ==================== */
const MODES = {
  arcade:  { label:"ARCADE",        startPlayer:6, waves:true,  endless:false, winPts:100 },
  classic: { label:"CLASSIC 9V9",   startPlayer:0, waves:false, endless:false, winPts:100 }, // startPlayer 0 → split whole menu
  endless: { label:"ENDLESS",       startPlayer:6, waves:false, endless:true,  winPts:150 },
  pvp:     { label:"PVP",           startPlayer:0, waves:false, endless:false, winPts:0 },
  duel:    { label:"DUEL",          startPlayer:0, waves:false, endless:false, winPts:0, duel:true },
};
const game = {
  mode:"arcade", phase:"title", paused:false,
  playerDeck:[], aiDeck:[], bag:[], pot:[],
  turnOwner:"player", playerCard:null, aiCard:null, statKey:null,
  round:0, wave:1, busy:false, aiLevel:1,
  score:0, streak:0, bestStreak:0, biggestPot:0, roundsPlayed:0, statWins:{},
  pickHistory:{}, // stat -> times player picked it (Landlord reads this)
  pvp:{ picker:"p1", captures:{ p1:0, p2:0 }, matchWinner:null, remote:false, role:null, room:null, ready:false },
  duel:{ seed:null, bag:[], p1Score:0, p2Score:0, player:1, bagBuilt:false },
  demo:false, pendingMode:null,
  rng:Math.random,
};

function refillBag(){ refillBagRng(); }
function drawFromBag(n){ return drawFromBagRng(n); }
function aiLevelForWave(w){ return w <= 2 ? 0 : (w <= 5 ? 1 : 2); }
function isBossWave(w){ return w > 1 && (w % 4) === 0; }


function startGame(mode){
  game.mode = mode;
  game.pendingMode = null;
  el("demoChip").style.display = game.demo ? "" : "none";
  Spoons.applyOverlaySync();
  const M = MODES[mode];
  game.playerDeck = []; game.aiDeck = []; game.pot = []; game.bag = [];
  game.turnOwner = "player"; game.statKey = null;
  game.score = 0; game.streak = 0; game.bestStreak = 0; game.biggestPot = 0;
  game.roundsPlayed = 0; game.statWins = {}; game.pickHistory = {};
  game.wave = 1; game.aiLevel = M.waves ? 0 : 1;
  game.pvp.picker = "p1";
  game.pvp.captures = { p1:0, p2:0 };
  game.pvp.matchWinner = null;
  game.pvp.remote = false; game.pvp.role = null; game.pvp.room = null; game.pvp.ready = false;
  if (mode === "duel" || M.duel){
    startDuel();
    return;
  }
  game.duel.seed = null; game.duel.bag = []; game.duel.bagBuilt = false; game.duel.player = 1;
  game.duel.p1Score = 0; game.duel.p2Score = 0; game.rng = Math.random;
  if (M.endless || M.waves){
    game.playerDeck = drawFromBag(M.startPlayer);
    game.aiDeck = M.waves ? drawFromBag(Math.min(4 + game.wave, 12)) : [];
  } else { // classic: whole menu split
    const sh = shuffle(CARDS.slice());
    const half = Math.ceil(sh.length / 2);
    game.playerDeck = sh.slice(0, half);
    game.aiDeck = sh.slice(half);
  }
  showScreen("table");
  AudioFX.startMusic();
  beginRound();
}

function buildDuelBag(seed){
  const rng = mulberry32(seed);
  let bag = CARDS.slice();
  for (let i = bag.length - 1; i > 0; i--){
    const j = Math.floor(rng() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
}

function startDuel(){
  const seed = seedForDuel();
  game.duel.seed = seed; game.duel.bag = buildDuelBag(seed); game.duel.bagBuilt = true;
  game.duel.p1Score = 0; game.duel.p2Score = 0; game.duel.player = 1;
  game.rng = mulberry32(seed);
  startArcadeRunForPlayer(1);
}

function startArcadeRunForPlayer(player){
  game.playerDeck = []; game.aiDeck = []; game.pot = []; game.bag = [];
  game.turnOwner = "player"; game.statKey = null;
  game.score = 0; game.streak = 0; game.bestStreak = 0; game.biggestPot = 0;
  game.roundsPlayed = 0; game.statWins = {}; game.pickHistory = {};
  game.wave = 1; game.aiLevel = 0;
  game.duel.player = player;
  // draw from the pre-shuffled duel bag using seeded rng
  game.playerDeck = drawFromBagRng(6, game.rng);
  game.aiDeck = drawFromBagRng(Math.min(4 + game.wave, 12), game.rng);
  el("sideLabelPlayer").textContent = "PLAYER " + player + " — PICK A STAT";
  el("sideLabelAi").textContent = "THE SPOONS";
  showScreen("table");
  AudioFX.startMusic();
  beginRound();
}

function beginRound(){
  if (game.pvp.remote && game.pvp.role === "guest") return;
  if (game.mode === "endless"){
    if (!game.playerDeck.length){ endGame(); return; }
  } else if (!game.playerDeck.length || !game.aiDeck.length){ endGame(); return; }
  game.phase = "play";
  game.playerCard = game.playerDeck.shift();
  game.aiCard = game.mode === "endless"
    ? drawFromBag(1)[0]
    : game.aiDeck.shift();
  const pvp = game.mode === "pvp";
  const duel = MODES[game.mode].duel;
  renderHud();
  if (duel){
    el("sideLabelPlayer").textContent = "PLAYER " + game.duel.player + " — PICK A STAT";
    el("sideLabelAi").textContent = isBossWave(game.wave) ? "THE LANDLORD" : "THE SPOONS";
  } else if (pvp){
    if (game.pvp.remote){
      const guestPicker = game.pvp.picker === "p2";
      el("sideLabelPlayer").textContent = guestPicker ? "PICK A STAT" : "YOUR CARD";
      el("sideLabelAi").textContent = "OPPONENT — FACE DOWN";
    } else {
      el("sideLabelPlayer").textContent = game.pvp.picker === "p1" ? "PLAYER 1 — PICK A STAT" : "PLAYER 2 — PICK A STAT";
      el("sideLabelAi").textContent = game.pvp.picker === "p1" ? "PLAYER 2 — FACE DOWN" : "PLAYER 1 — FACE DOWN";
    }
  } else {
    el("sideLabelPlayer").textContent = "YOUR CARD";
    el("sideLabelAi").textContent = "THE SPOONS";
  }
  renderPlayerCard({ pickable: pvp || duel || game.turnOwner === "player", deal: true });
  const bossNow = MODES[game.mode].waves && isBossWave(game.wave);
  renderAiBack({ boss: bossNow });
  AudioFX.deal();
  if (bossNow) AudioFX.boss();
  setVerdict(game.turnOwner === "player"
    ? '<div class="verdict-sub" style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffc94d;">' +
      (pvp ? (game.pvp.picker === "p1" ? "PLAYER 1" : "PLAYER 2") + " — PICK YOUR STAT" : "TAP A STAT TO PLAY") + "</div>"
    : '<div class="verdict-line" id="aiThinking">' + pick(AI_THINKING) + '</div>');
  clearActions();
  if (game.turnOwner === "ai") aiTurn();

  if (game.pvp.remote && game.pvp.role === "host") broadcastRound();}

function playerPick(statKey){
  if (game.mode === "pvp" && game.pvp.remote && game.pvp.role === "guest"){
    guestPick(statKey);
    return;
  }
  if (game.phase !== "play" || game.turnOwner !== "player" || game.paused) return;
  game.pickHistory[statKey] = (game.pickHistory[statKey] || 0) + 1;
  game.statKey = statKey;
  AudioFX.click();
  resolveRound();
}

function aiTurn(){
  game.busy = true;
  // Anticipation delay: "thinking" window before the Spoons picks.
  // Scales with AI level (Punter is quick, the Landlord makes you sweat) + a little randomness.
  const base = [450, 750, 1150][Math.min(game.aiLevel, 2)];
  const jitter = 150 + Math.floor(Math.random() * 350);
  const delay = base + (game.aiLevel >= 1 ? jitter : jitter / 3);
  setTimeout(() => {
    if (game.phase !== "play") { game.busy = false; return; }
    if (game.paused){ setTimeout(aiTurn, 300); return; } // hold the AI's turn while paused
    game.statKey = aiChooseStat(game.aiCard, game.aiLevel);
    game.busy = false;
    resolveRound();
  }, delay);
}

function settle(statKey){
  const result = compareStat(game.playerCard, game.aiCard, statKey);
  if (game.mode === "pvp"){
    game.lastRemoteWinner = result > 0 ? "player" : result < 0 ? "ai" : "draw";
    const taken = [game.playerCard, game.aiCard, ...game.pot.splice(0)];
    if (result > 0){ game.playerDeck.push(...taken); game.pvp.picker = "p1"; game.pvp.captures.p1++; return "player"; }
    if (result < 0){ game.aiDeck.push(...taken); game.pvp.picker = "p2"; game.pvp.captures.p2++; return "ai"; }
    game.pot.push(...taken); return "draw";
  }
  if (game.mode === "endless"){
    if (result > 0){ game.playerDeck.push(game.aiCard, ...game.pot.splice(0)); return "player"; }
    if (result < 0){ game.playerDeck.push(...game.pot.splice(0)); return "ai"; } // player's card is binned
    game.pot.push(game.playerCard, game.aiCard); return "draw";
  }
  const taken = [game.playerCard, game.aiCard, ...game.pot.splice(0)];
  if (result > 0){ game.playerDeck.push(...taken); game.turnOwner = "player"; return "player"; }
  if (result < 0){ game.aiDeck.push(...taken); game.turnOwner = "ai"; return "ai"; }
  game.pot.push(...taken); return "draw";
}

function resolveRound(){
  game.phase = "reveal";
  game.roundsPlayed++;
  const winner = settle(game.statKey);
  const st = statByKey(game.statKey);
  const margin = Math.abs(st.get(game.playerCard) - st.get(game.aiCard));

  if (winner === "player" && game.mode !== "pvp"){
    game.streak++;
    game.bestStreak = Math.max(game.bestStreak, game.streak);
    game.statWins[game.statKey] = (game.statWins[game.statKey] || 0) + 1;
    const mult = Math.min(Math.max(1, game.streak), 5);
    const pts = (MODES[game.mode].winPts + Math.floor(margin / PERC[game.statKey].range * 100)) * mult;
    game.score += pts;
    if (game.streak >= 2) showCombo(mult);
    if (game.streak >= 2) AudioFX.bacon(game.streak);
    AudioFX.win(game.streak); shake("shake-soft");
  } else if (winner === "ai"){
    game.streak = 0;
    AudioFX.lose(); shake("shake-hard");
  } else {
    AudioFX.draw();
  }
  game.biggestPot = Math.max(game.biggestPot, game.pot.length);

  renderHud();
  renderAiReveal();
  highlightStats(game.statKey, winner);
  renderVerdict(winner, margin);

  if (MODES[game.mode].waves && !game.aiDeck.length){
    const bonus = 500 * game.wave;
    const oldWave = game.wave;
    game.score += bonus;
    game.wave++;
    game.aiLevel = aiLevelForWave(game.wave);
    game.aiDeck = drawFromBag(Math.min(4 + game.wave, 12));
    renderHud();
    AudioFX.wave();
    const boss = isBossWave(game.wave);
    setVerdict('<div class="verdict-line wave-clear">WAVE ' + oldWave + ' CLEARED</div>' +
      '<div class="verdict-sub">+' + bonus + ' · NEXT: ' + (boss ? 'BOSS — THE LANDLORD' : AI_NAMES[game.aiLevel]) + ' · ' + game.aiDeck.length + ' CARDS</div>');
    if (boss) shake("shake-hard");
    renderNextButton();
    return;
  }
  if (game.mode === "endless"){
    if (!game.playerDeck.length){ setTimeout(endGame, 1500); return; }
  } else if (!game.playerDeck.length || !game.aiDeck.length){
    setTimeout(() => endGame(winner), 1500); return;
  }
  if (game.mode === "pvp" && (game.pvp.captures.p1 >= 25 || game.pvp.captures.p2 >= 25)){
    game.phase = "over";
    game.pvp.matchWinner = game.pvp.captures.p1 >= 25 ? "p1" : "p2";
    if (game.pvp.remote) sendOver();
    setTimeout(() => { if (game.pvp.remote && game.pvp.role === "host") endRemoteGame(); else endGame(); }, 1400);
    return;
  }
  if (game.pvp.remote){
    if (game.pvp.role === "host"){
      hostReady = false; guestReady = false;
      broadcastRound();
      renderNextButton();
      const btn = document.getElementById("btnNext");
      if (btn){
        btn.replaceWith(btn.cloneNode(true));
        const fresh = document.getElementById("btnNext");
        fresh.addEventListener("click", () => {
          if (game.phase === "reveal"){ hostReady = true; checkProceed(); }
        });
      }
      return;
    }
    return;
  }
  renderNextButton();
}

function endGame(){
  game.phase = "over";
  AudioFX.stopMusic();
  if (game.pvp.remote && game.pvp.role === "host"){ endRemoteGame(); return; }
  closeRewardScreen();
  AudioFX.over();
  const mode = game.mode, M = MODES[mode];
  const duel = M.duel;
  const you = game.playerDeck.length;
  const ai = game.aiDeck.length;
  const title = document.getElementById("overTitle");
  const tag = document.getElementById("overTag");
  const rematchBtn = document.getElementById("btnRematch");
  if (tag) tag.textContent = "";
  if (mode === "pvp"){
    if (game.pvp.matchWinner){
      title.textContent = game.pvp.matchWinner === "p1" ? "PLAYER 1 WINS THE MATCH" : "PLAYER 2 WINS THE MATCH";
      title.className = game.pvp.matchWinner === "p1" ? "win" : "lose";
    } else {
      title.textContent = you > ai ? "PLAYER 1 HOLDS THE MENU" : you < ai ? "PLAYER 2 HOLDS THE MENU" : "DEAD HEAT — THE POT WINS";
      title.className = you > ai ? "win" : you < ai ? "lose" : "";
    }
  } else if (duel){
    finishDuelTurn();
    return;
  } else if (mode === "endless"){
    title.textContent = "CUT OFF AT " + game.roundsPlayed + " ROUNDS";
    title.className = "lose";
  } else if (you > ai){
    title.textContent = mode === "arcade" ? "GAME OVER — SCORE " + game.score : "LAST ORDERS ARE YOURS";
    title.className = "win";
    showReward("player");
  } else if (you === ai){
    title.textContent = "DEAD HEAT — THE POT WINS";
    title.className = "";
  } else {
    title.textContent = mode === "arcade" ? "GAME OVER — SCORE " + game.score : "YOU'VE BEEN CUT OFF";
    title.className = "lose";
  }
  if (!game.pvp.remote && mode !== "pvp") submitMyResult(mode === "arcade" ? game.score > 0 : you > ai);
  const isArcade = mode === "arcade";
  document.getElementById("overScore").textContent =
    isArcade ? "HIGH SCORE " + highScore("arcade") : "SCORE " + game.score + " · BEST " + highScore(mode);
  document.getElementById("overStats").innerHTML =
    "ROUNDS " + game.roundsPlayed + " · LONGEST STREAK " + game.bestStreak +
    " · BIGGEST POT " + game.biggestPot +
    "<br>GO-TO WEAPON: " + topStatLine();
  if (isArcade){
    if (tag) tag.textContent = "INSERT COIN";
    if (rematchBtn){ rematchBtn.textContent = "INSERT COIN"; rematchBtn.className = "btn btn-cream insert-coin"; }
    if (game.score > highScore("arcade")) try { localStorage.setItem("spoons.high.arcade", String(game.score)); } catch(e){}
  }
  renderLeaderboard(isArcade ? "arcade" : mode);
  const isHigh = !isArcade && game.score > 0 && game.score > highScore(mode);
  document.getElementById("initialsForm").classList.toggle("open", isHigh);
  if (isHigh){ el("initialsInput").focus(); el("initialsInput").select(); }
  showScreen("over");
}

function finishDuelTurn(){
  if (game.duel.player === 1){
    game.duel.p1Score = game.score;
    showHandoff(2);
  } else {
    game.duel.p2Score = game.score;
    const p1 = game.duel.p1Score, p2 = game.duel.p2Score;
    const title = document.getElementById("overTitle");
    const tag = document.getElementById("overTag");
    const rematchBtn = document.getElementById("btnRematch");
    title.className = p1 > p2 ? "win" : p1 < p2 ? "lose" : "";
    if (p1 > p2){ title.textContent = "PLAYER 1 WINS " + p1.toLocaleString() + " - " + p2.toLocaleString(); if (tag) tag.textContent = "MATCH"; }
    else if (p2 > p1){ title.textContent = "PLAYER 2 WINS " + p2.toLocaleString() + " - " + p1.toLocaleString(); if (tag) tag.textContent = "MATCH"; }
    else {
      title.textContent = "DRAW — SUDDEN DEATH";
      if (tag) tag.textContent = "REPLAY WAVE 1";
      if (rematchBtn){ rematchBtn.textContent = "SUDDEN DEATH"; rematchBtn.className = "btn btn-cream"; }
      showScreen("over");
      return;
    }
    document.getElementById("overScore").textContent = "P1 " + p1.toLocaleString() + " · P2 " + p2.toLocaleString();
    document.getElementById("overStats").textContent = "BEST STREAK P1 " + game.bestStreak;
    document.getElementById("leaderboard").textContent = "";
    document.getElementById("initialsForm").classList.remove("open");
    if (rematchBtn){ rematchBtn.textContent = "REMATCH"; rematchBtn.className = "btn btn-cream"; }
    showScreen("over");
  }
}

function showHandoff(player){
  game.phase = "handoff";
  document.getElementById("handoffTitle").textContent = "PLAYER " + player + " — YOUR GO";
  document.getElementById("handoffSub").textContent = game.duel.p1Score.toLocaleString() + " TO BEAT";
  const btn = document.getElementById("btnHandoffGo");
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  newBtn.addEventListener("click", () => { startArcadeRunForPlayer(player); });
  showScreen("handoff");
}
function topStatLine(){
  const entries = Object.entries(game.statWins).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return "NONE (brutal)";
  const st = statByKey(entries[0][0]);
  return st.label + " ×" + entries[0][1];
}

/* ---------- high scores ---------- */
function highScore(mode){
  try { const v = localStorage.getItem("spoons.high." + mode); return v ? parseInt(v, 10) || 0 : 0; }
  catch(e){ return 0; }
}
function saveScore(mode, initials, score){
  if (mode !== "arcade") return;
  const key = "spoons.board." + mode;
  let board = [];
  try { board = JSON.parse(localStorage.getItem(key)) || []; } catch (e) { board = []; }
  board.push({ ini: initials, sc: score });
  board.sort((a, b) => b.sc - a.sc);
  board = board.slice(0, 5);
  try { localStorage.setItem(key, JSON.stringify(board)); } catch(e){}
  if (score > highScore(mode)) try { localStorage.setItem("spoons.high." + mode, String(score)); } catch(e){}
}
function renderLeaderboard(mode){
  let board = [];
  try { board = JSON.parse(localStorage.getItem("spoons.board." + mode)) || []; } catch (e) {}
  if (!board.length){ document.getElementById("leaderboard").textContent = "NO SCORES YET — BE THE FIRST."; return; }
  document.getElementById("leaderboard").innerHTML =
    board.map((b, i) => (i + 1) + ". " + b.ini + " — " + b.sc).join("<br>");
}
function refreshBests(){
  const ba = document.getElementById("bestArcade");
  if (ba) ba.textContent = "ARCADE · BEST " + highScore("arcade");
  document.getElementById("countBest").textContent = highScore("arcade");
}

/* ==================== 5. UI ==================== */
const el = id => document.getElementById(id);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const BANTER = {
  player:["YOURS. GET IN.","THE SPOONS FEARS YOU.","TAKEN. NO CONTEST.","AN ABSOLUTE STEAL.","THE CARPET TREMBLES."],
  ai:["THE HOUSE TAKES IT.","DEVASTATING.","THE CARPET CLAIMS ANOTHER.","NOT YOUR ROUND.","THE LANDLORD LAUGHS."],
  draw:["DEAD HEAT. TO THE POT.","SPLIT DECISION. POT GROWS."],
};
function showScreen(name){
  for (const s of ["title", "table", "over", "handoff"]) el("screen-" + s).classList.toggle("hidden", s !== name);
  if (name === "title"){ AudioFX.stopMusic(); openOnlinePanel(false); closeSpoonsPanel(); closeRewardScreen(); openOrderPanel(false); Spoons.restoreNational(); stopAttract(); }
}
function shake(cls){
  const st = el("stage");
  st.classList.remove("shake-soft", "shake-hard");
  void st.offsetWidth;
  st.classList.add(cls);
}
function showCombo(mult){
  const c = el("comboPop");
  if (mult >= 4){
    c.textContent = "🐖💨 STREAK ×" + mult + " 💨🐖";
    c.classList.add("farting");
  } else {
    c.classList.remove("farting");
    const strips = "🥓".repeat(Math.min(mult, 5));
    c.textContent = strips + " STREAK ×" + mult;
  }
  c.style.fontSize = "clamp(" + (18 + mult * 3) + "px," + (4 + mult) + "vw," + (30 + mult * 5) + "px)";
  c.classList.remove("show"); void c.offsetWidth; c.classList.add("show");
  setTimeout(() => { c.classList.remove("show"); c.classList.remove("farting"); }, 2000);
}

function renderHud(){
  const lastPot = renderHud._lastPot || 0;
  const potNow = game.pot.length;
  el("scoreChip").textContent = String(game.score).padStart(6, "0");
  el("modeLabel").textContent = MODES[game.mode].label;
  el("countPlayer").textContent = game.playerDeck.length;
  el("countPot").textContent = game.pot.length;
  const chipPlayerLabel = el("chipPlayerLabel"), chipAiLabel = el("chipAiLabel"), waveChip = el("waveChip"), aiChip = el("aiChip");
  if (game.mode === "pvp"){
    chipPlayerLabel.textContent = "P1";
    chipAiLabel.textContent = "P2";
    aiChip.style.display = ""; waveChip.style.display = "none";
  } else {
    chipPlayerLabel.textContent = "YOU";
    chipAiLabel.textContent = "SPOONS";
    if (MODES[game.mode].waves){ waveChip.style.display = ""; el("countWave").textContent = game.wave; aiChip.style.display = ""; }
    else if (MODES[game.mode].endless){ el("waveChipLabel").textContent = "STREAK"; el("countWave").textContent = game.streak; waveChip.style.display = ""; aiChip.style.display = "none"; }
    else { waveChip.style.display = "none"; aiChip.style.display = ""; }
  }
  el("scoreChip").style.display = game.mode === "pvp" ? "none" : "";
  el("potChip").style.display = game.pot.length ? "" : "none";
  const potChip = el("potChip");
  if (potChip && potNow > lastPot){
    potChip.classList.remove("pot-pulse"); void potChip.offsetWidth; potChip.classList.add("pot-pulse");
  }
  renderHud._lastPot = potNow;
  const combo = el("comboChip");
  combo.style.display = game.streak >= 2 ? "" : "none";
  if (game.streak >= 2) combo.textContent = game.streak >= 4 ? "🐖 ×" + game.streak : "🥓 ×" + game.streak;
  el("countBest").textContent = highScore(game.mode);
}

function statRowHTML(st, card, opts){
  const value = st.get(card);
  const arrow = st.higherWins ? "▲" : "▼";
  const pct = Math.round(Math.max(0, Math.min(1, value / st.max)) * 100);
  const selected = opts && opts.selectedKey === st.key ? " selected" : "";
  const slam = opts && opts.slam && selected ? " slam" : "";
  const dim = opts && opts.selectedKey && !selected ? " dim" : "";
  const bar = '<span class="stat-bar"><i style="width:' + pct + '%"></i></span>';
  const hint = opts && opts.asButton ? '<span class="keyhint">' + (opts.index + 1) + '</span>' : "";
  const label = st.label + ' <span class="tag" title="' + (st.higherWins ? "higher wins" : "LOWER wins") + '">' + arrow + "</span>";
  const inner = '<span class="stat-label">' + label + '</span>' + bar +
    '<span class="stat-val"' + (st.key === 'price' || st.key === 'kcal' ? ' style="font-variant-numeric:tabular-nums;"' : '') + '>' + st.fmt(value) + "</span>" + hint;
  return opts && opts.asButton
    ? '<button class="stat' + selected + dim + '" data-stat="' + st.key + '">' + inner + "</button>"
    : '<div class="stat' + selected + dim + '">' + inner + "</div>";
}
function cardFaceHTML(card, opts){
  opts = opts || {};
  const rows = STATS.map((st, i) => statRowHTML(st, card, Object.assign({}, opts, { index: i }))).join("");
  const diet = card.diet === "VG" ? '<span class="diet-chip">VG</span>'
    : card.diet === "V" ? '<span class="diet-chip v">V</span>' : "";
  const deal = opts.deal ? " deal" : "";
  return '<article class="card' + deal + '">' +
    '<div class="card-art">' + card.art + "</div>" +
    '<div class="card-body">' +
      '<div class="card-topline"><button class="cat-chip" data-cat="' + card.cat + '">' + (CAT_LABEL[card.cat] || card.cat) + "</button>" + diet + "</div>" +
      '<h3 class="card-name">' + card.name + "</h3>" +
      '<div class="stats' + (opts.locked ? " stats-locked" : "") + '">' + rows + "</div>" +
    "</div></article>";
}
function cardChipOpenBrowser(e){
  const chip = e.target.closest("button.cat-chip");
  if (!chip) return;
  browserCat = chip.dataset.cat;
  const chips = el("catChips");
  if (chips.dataset.built){
    const target = chips.querySelector('button[data-cat="' + browserCat + '"]');
    if (target) chips.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === target));
  }
  openBrowser();
}
function renderPlayerCard(opts){
  opts = opts || {};
  const remoteGuest = game.pvp.remote && game.pvp.role === "guest";
  const pickable = opts.pickable || (remoteGuest && game.phase === "play" && game.pvp.picker === "p2");
  const onFire = game.streak >= 3 && game.phase === "reveal";
  el("playerCard").innerHTML = cardFaceHTML(game.playerCard, {
    asButton: pickable, locked: !pickable, deal: opts.deal,
  });
  const pc = el("playerCard").querySelector(".card");
  if (pc && onFire) pc.classList.add("flame");
}
function renderAiBack(opts){
  opts = opts || {};
  const boss = opts.boss ? ' boss' : '';
  const label = opts.boss ? 'THE LANDLORD' : 'SPOONS<br><span class="red">TOP</span><br>TRUMPS';
  el("aiCard").innerHTML =
    '<article class="card"><div class="card-back' + boss + '"><div class="diamond"><div class="diamond-text">' + label + '</div></div></div></article>';
}
function renderAiReveal(){
  el("aiCard").innerHTML = cardFaceHTML(game.aiCard, { locked: true, selectedKey: game.statKey });
  AudioFX.flip();
  const card = el("aiCard").querySelector(".card");
  if (card){
    card.classList.add("reveal");
    if (MODES[game.mode].waves && isBossWave(game.wave)){
      card.classList.add("boss-shake");
      setTimeout(() => card.classList.remove("boss-shake"), 500);
    }
  }
}
function highlightStats(statKey, winner){
  const onFire = game.streak >= 3 && winner === "player";
  el("playerCard").innerHTML = cardFaceHTML(game.playerCard, {
    locked: true, selectedKey: statKey, slam: true,
  });
  const pc = el("playerCard").querySelector(".card"), ac = el("aiCard").querySelector(".card");
  if (winner === "player" && ac) ac.classList.add("defeat");
  if (winner === "ai" && pc) pc.classList.add("defeat");
  if (winner === "player" && pc) pc.classList.add("award");
  if (winner === "ai" && ac) ac.classList.add("award");
  if (onFire && pc) pc.classList.add("flame");
}
function renderVerdict(winner, margin){
  const line = winner === "player" ? pick(BANTER.player)
    : winner === "ai" ? pick(BANTER.ai) : pick(BANTER.draw);
  const cls = winner === "player" ? "win" : winner === "ai" ? "lose" : "draw";
  const flash = (winner === "player" || winner === "ai") ? " score-flash" : "";
  const st = statByKey(game.statKey);
  const sub = winner === "draw"
    ? game.playerCard.name + " " + st.fmt(st.get(game.playerCard)) + " — same as " + game.aiCard.name + ". The pot grows to " + game.pot.length + "."
    : game.playerCard.name + " " + st.fmt(st.get(game.playerCard)) + " vs " + game.aiCard.name + " " + st.fmt(st.get(game.aiCard)) +
      (winner === "player" ? " · +" + Math.floor(margin / PERC[game.statKey].range * 100) + " margin bonus" : "");
  const pvpLine = game.mode === "pvp"
    ? '<div class="verdict-sub" style="font-family:\'Press Start 2P\',monospace;font-size:9px;color:#ffc94d;">CAPTURES — P1: ' +
      game.pvp.captures.p1 + " · P2: " + game.pvp.captures.p2 + " · FIRST TO 25</div>" : "";
  setVerdict('<div class="verdict-line ' + cls + flash + '">' + line + "</div><div class=\"verdict-sub\">" + sub + "</div>" + pvpLine);
}
function setVerdict(html){ el("verdict").innerHTML = html; }
function clearActions(){ el("roundActions").innerHTML = ""; }
function renderNextButton(){
  el("roundActions").innerHTML = '<button id="btnNext" class="btn btn-cream">NEXT CARD</button>';
  el("btnNext").addEventListener("click", () => { if (game.phase === "reveal") beginRound(); });
}

/* ---------- attract mode removed ---------- */
function startAttract(){ }
function stopAttract(){ }

/* ==================== 6. MENU BROWSER ==================== */
let browserCat = "ALL";
function openBrowser(){
  el("browser").classList.add("open");
  const chips = el("catChips");
  if (!chips.dataset.built){
    chips.dataset.built = "1";
    const cats = ["ALL"].concat(Object.keys(CAT_LABEL));
    chips.innerHTML = cats.map(c =>
      '<button data-cat="' + c + '"' + (c === "ALL" ? ' class="on"' : "") + ">" +
      (c === "ALL" ? "ALL " + CARDS.length : (CAT_LABEL[c] + " " + CARDS.filter(x => x.cat === c).length)) + "</button>").join("");
    chips.addEventListener("click", e => {
      const b = e.target.closest("button[data-cat]");
      if (!b) return;
      browserCat = b.dataset.cat;
      chips.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
      renderBrowserGrid();
      AudioFX.click();
    });
  }
  renderBrowserGrid();
}
function closeBrowser(){ el("browser").classList.remove("open"); el("browserDetail").classList.remove("open"); }
function renderBrowserGrid(){
  const q = (el("browserSearch").value || "").trim().toLowerCase();
  const list = CARDS.filter(c =>
    (browserCat === "ALL" || c.cat === browserCat) &&
    (!q || c.name.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q)));
  el("browserCount").textContent = list.length + " ITEMS";
  el("browserGrid").innerHTML = list.map(c =>
    '<div class="bcard" data-name="' + c.name.replace(/"/g, "&quot;") + '">' +
    '<span class="art">' + c.art + "</span><span><span class='nm'>" + c.name + "</span>" +
    "<span class='meta'>" + CAT_LABEL[c.cat] + " · £" + c.price.toFixed(2) + " · " + c.kcal + " kcal" +
    (c.diet ? " · " + c.diet : "") + "</span></span></div>").join("");
}
function openDetail(name){
  const card = CARDS.find(c => c.name === name);
  if (!card) return;
  const det = el("browserDetail");
  det.innerHTML = '<div style="filter:drop-shadow(0 20px 40px rgba(0,0,0,.6))">' +
    cardFaceHTML(card, { locked: true }) +
    '<div style="text-align:center;margin-top:10px;"><button class="btn btn-cream" id="btnDetailClose">CLOSE</button></div></div>';
  det.classList.add("open");
  const detailChip = det.querySelector("button.cat-chip");
  if (detailChip) detailChip.addEventListener("click", cardChipOpenBrowser);
  el("btnDetailClose").addEventListener("click", () => det.classList.remove("open"));
  det.addEventListener("click", e => { if (e.target === det) det.classList.remove("open"); }, { once: true });
}

/* ==================== 7. WIRING ==================== */
el("btnArcade").addEventListener("click", () => { onModeStartRequested("arcade"); });
// Classic/Endless buttons removed from title; branches remain callable for tests.
// el("btnClassic").addEventListener("click", () => { AudioFX.unlock(); startGame("classic"); });
// el("btnEndless").addEventListener("click", () => { AudioFX.unlock(); startGame("endless"); });
el("btnPvp").addEventListener("click", () => { onModeStartRequested("duel"); });
el("btnOnline").addEventListener("click", () => { AudioFX.unlock(); openOnlinePanel(true); });
el("btnSpoons").addEventListener("click", () => { AudioFX.click(); openSpoonsPanel(); });
el("btnSpoonsBack").addEventListener("click", () => { AudioFX.click(); closeSpoonsPanel(); });
el("btnHost").addEventListener("click", () => { AudioFX.click(); startHost(); });
el("btnJoin").addEventListener("click", () => { AudioFX.click(); startJoin(el("roomCode").value); });
el("btnOnlineBack").addEventListener("click", () => { openOnlinePanel(false); Net.close(); });
el("btnCopyLink").addEventListener("click", () => { AudioFX.click(); copyRoomLink(); });
el("roomCode").addEventListener("input", () => {
  const v = cleanCode(el("roomCode").value);
  el("roomCode").value = v;
});
Net.onMessage(msg => {
  if (game.pvp.role === "host") onGuestMessage(msg);
  else onHostMessage(msg);
});
Net.onDisconnect(() => {
  if (game.phase !== "title") onDisconnect();
});
el("btnRematch").addEventListener("click", () => {
  AudioFX.unlock();
  game.demo = false;
  if (game.mode === "arcade"){ startGame("arcade"); }
  else if (game.mode === "pvp"){
    const p1 = game.duel.p1Score, p2 = game.duel.p2Score;
    if (p1 === p2 && game.duel.player === 2){ suddenDeathDuel(); }
    else { startGame("pvp"); }
  }
  else { startGame(game.mode); }
});
function suddenDeathDuel(){
  game.duel.p1Score = 0; game.duel.p2Score = 0; game.duel.player = 1;
  game.duel.seed = seedForDuel();
  game.duel.bag = buildDuelBag(game.duel.seed);
  game.rng = mulberry32(game.duel.seed);
  startArcadeRunForPlayer(1);
}
el("btnOverMenu").addEventListener("click", () => { game.demo = false; el("demoChip").style.display = "none"; refreshBests(); showScreen("title"); });
el("btnBrowser").addEventListener("click", openBrowser);
el("btnPauseBrowser").addEventListener("click", openBrowser);
el("spoonsSearch").addEventListener("input", renderSpoonsList);
el("spoonsList").addEventListener("click", onSpoonsItemClick);
el("spoonsStatus").addEventListener("click", e => {
  const b = e.target.closest("#btnSpoonsClear");
  if (b){ Spoons.clearPub(); updateSpoonsHeader(); updatePlayingAt(); renderSpoonsList(); }
});
el("btnBrowserClose").addEventListener("click", closeBrowser);
el("btnHowTitle").addEventListener("click", () => { const d = el("howto"); d.open = !d.open; });
el("btnOrderInfo").addEventListener("click", onOrderInfo);
el("btnHaveOrdered").addEventListener("click", onHaveOrdered);
el("btnPlayDemo").addEventListener("click", onPlayDemo);
el("btnNewSession").addEventListener("click", onNewSession);
el("btnOrderBack").addEventListener("click", onOrderBack);
el("btnRewardPlay").addEventListener("click", onRewardPlay);
el("btnRewardTitle").addEventListener("click", onRewardTitle);
el("playerCard").addEventListener("click", e => {
  const chip = e.target.closest("button.cat-chip");
  if (chip){ cardChipOpenBrowser(e); return; }
  const btn = e.target.closest("button.stat");
  if (btn) playerPick(btn.dataset.stat);
});
el("aiCard").addEventListener("click", e => {
  const chip = e.target.closest("button.cat-chip");
  if (chip){ cardChipOpenBrowser(e); return; }
});
el("browserSearch").addEventListener("input", renderBrowserGrid);
el("browserGrid").addEventListener("click", e => {
  const b = e.target.closest(".bcard");
  if (b) openDetail(b.dataset.name);
});
el("btnBoards").addEventListener("click", () => {
  document.getElementById("boardsOverlay").classList.add("open");
  renderBoards("global");
});
el("btnBoardsClose").addEventListener("click", () => {
  document.getElementById("boardsOverlay").classList.remove("open");
});
el("tabGlobal").addEventListener("click", () => { setBoardTab("global"); });
el("tabPub").addEventListener("click", () => { setBoardTab("pub"); });
el("tabPubPlayer").addEventListener("click", () => { setBoardTab("pubplayer"); });
el("btnSignupGo").addEventListener("click", doSignup);
el("signupName").addEventListener("keydown", e => { if (e.key === "Enter") el("signupPub").focus(); });
el("signupPub").addEventListener("keydown", e => { if (e.key === "Enter") doSignup(); });

el("btnMute").addEventListener("click", () => {
  AudioFX.unlock();
  const m = AudioFX.toggleMute();
  el("btnMute").textContent = m ? "🔇" : "🔊";
});
el("btnMusic").addEventListener("click", () => {
  AudioFX.unlock();
  const on = AudioFX.toggleMusic();
  el("btnMusic").textContent = on ? "🎵" : "🎵̸";
  el("btnMusic").style.opacity = on ? "1" : "0.45";
});
el("btnMusic").textContent = AudioFX.musicEnabled() ? "🎵" : "🎵̸";
el("btnMusic").style.opacity = AudioFX.musicEnabled() ? "1" : "0.45";
el("btnMute").textContent = AudioFX.isMuted() ? "🔇" : "🔊";
el("btnPause").addEventListener("click", togglePause);
el("btnResume").addEventListener("click", togglePause);
el("btnQuit").addEventListener("click", () => {
  el("pause").classList.remove("open");
  game.paused = false; game.phase = "title"; game.demo = false; el("demoChip").style.display = "none";
  AudioFX.stopMusic();
  Net.close();
  refreshBests(); showScreen("title");
});
el("btnSaveInitials").addEventListener("click", () => {
  const ini = (el("initialsInput").value || "AAA").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 3) || "AAA";
  saveScore(game.mode, ini, game.score);
  el("initialsForm").classList.remove("open");
  renderLeaderboard(game.mode);
  refreshBests();
  AudioFX.coin();
});
el("initialsInput").addEventListener("input", () => {
  el("initialsInput").value = el("initialsInput").value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 3);
});
function togglePause(){
  if (game.phase === "title" || game.phase === "over") return;
  game.paused = !game.paused;
  el("pause").classList.toggle("open", game.paused);
  if (game.paused){ AudioFX.stopMusic(); el("btnResume").focus(); }
  else { AudioFX.resumeMusic(); }
}
document.addEventListener("keydown", e => {
  if (el("browser").classList.contains("open")){
    if (e.key === "Escape") closeBrowser();
    return; // typing in search
  }
  if (e.key === "m" || e.key === "M"){ AudioFX.unlock(); el("btnMute").click(); return; }
  if (e.key === "p" || e.key === "P"){ AudioFX.unlock(); togglePause(); return; }
  if (e.key === "n" || e.key === "N"){ AudioFX.unlock(); el("btnMusic").click(); return; }
  if (game.paused) return;
  AudioFX.unlock();
  if (game.phase === "play" && game.turnOwner === "player"){
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= STATS.length){
      const st = STATS[n - 1];
      playerPick(st.key);
    }
  } else if (game.phase === "reveal" && (e.key === "Enter" || e.key === " ")){
    e.preventDefault();
    const nb = el("btnNext");
    if (nb) nb.click();
  } else if (game.phase === "over" && e.key === "Enter"){
    startGame(game.mode);
  }
});


/* ---------- order unlock ---------- */
const ORDER_LS = "spoons.hasOrdered";
const LASTCODE_LS = "spoons.lastCode";
function hasOrdered(){ try { return localStorage.getItem(ORDER_LS) === "1"; } catch(e){ return false; } }
function setOrdered(v){
  try { if (v) localStorage.setItem(ORDER_LS, "1"); else localStorage.removeItem(ORDER_LS); } catch(e){}
  updateOrderHint();
}
function updateOrderHint(){
  const h = el("orderHint");
  if (h) h.style.display = (REWARDS.unlocksOnOrder && !hasOrdered()) ? "" : "none";
}
function openOrderPanel(show){
  if (show && typeof AudioFX !== "undefined" && AudioFX.isMuted()){
    const hint = document.getElementById("soundHint");
    if (hint) hint.style.display = "";
  }
  const p = el("orderPanel");
  if (p) p.classList.toggle("open", show);
}
function closeRewardScreen(){
  const p = el("rewardScreen");
  if (p) p.classList.remove("open");
}
function generateCode(){
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}
function currentPubSlug(){
  const pub = Spoons.myPub();
  return pub ? pub.s : "national";
}
function rewardTierForRounds(n){
  let tier = REWARDS.tiers[0];
  for (const t of REWARDS.tiers){ if (n >= t.rounds) tier = t; }
  return tier;
}
function makeQrGrid(seed){
  let rng = mulberry32(seed ? hashStr(seed) : Math.floor(Math.random()*1e9));
  let out = "";
  for (let i = 0; i < 49; i++){
    const on = rng() > 0.45;
    out += "<i" + (on ? " class=\"on\"" : "") + "></i>";
  }
  return out;
}
function showReward(winner){
  closeRewardScreen();
  if (!REWARDS.unlocksOnOrder) return;
  if (game.demo) return;
  if (winner !== "player") return;
  if (!hasOrdered()) return;
  const tier = rewardTierForRounds(game.roundsPlayed);
  const code = generateCode();
  const pub = currentPubSlug();
  const now = new Date().toISOString();
  try {
    localStorage.setItem(LASTCODE_LS, JSON.stringify({ code, tier: tier.label, pub, ts: now }));
  } catch(e){}
  el("rewardLabel").textContent = tier.label;
  el("rewardCode").textContent = code;
  el("rewardQr").innerHTML = makeQrGrid(code);
  el("rewardMeta").textContent = pub === "national" ? "SPOONS NATIONAL" : pub.replace(/-/g, " ").toUpperCase();
  const rs = el("rewardScreen");
  rs.classList.add("open");
  AudioFX.stopMusic();
  AudioFX.reward();
}
function onModeStartRequested(mode){
  if (!REWARDS.unlocksOnOrder || hasOrdered() || mode === "pvp" || game.demo){
    AudioFX.unlock();
    startGame(mode);
    return;
  }
  game.pendingMode = mode;
  openOrderPanel(true);
}
function onPlayDemo(){
  game.demo = true;
  el("demoChip").style.display = "";
  openOrderPanel(false);
  AudioFX.unlock();
  const mode = game.pendingMode || "arcade";
  game.pendingMode = null;
  startGame(mode);
}
function onHaveOrdered(){
  setOrdered(true);
  openOrderPanel(false);
  AudioFX.unlock();
  const mode = game.pendingMode || "arcade";
  game.pendingMode = null;
  game.demo = false;
  el("demoChip").style.display = "none";
  startGame(mode);
}
function onNewSession(){
  setOrdered(false);
  updateOrderHint();
  AudioFX.click();
}
function onRewardPlay(){
  closeRewardScreen();
  AudioFX.unlock();
  AudioFX.resumeMusic();
  startGame(game.mode);
}
function onRewardTitle(){
  AudioFX.stopMusic();
  closeRewardScreen();
  refreshBests();
  showScreen("title");
}
function onOrderInfo(){
  openOrderPanel(true);
}
function onOrderBack(){
  openOrderPanel(false);
  game.pendingMode = null;
}

/* ==================== 8. DEBUG ==================== */
function countActiveCards(){ return CARDS.length; }
window.__game = game;
window.__spoons = Spoons;
window.__errs = [];
window.addEventListener("error", e => window.__errs.push(String(e.message)));
window.addEventListener("unhandledrejection", e => window.__errs.push("rejection: " + String(e.reason)));
window.__autoplay = function(mode){
  startGame(mode || "classic");
  let guard = 4000;
  while (game.phase !== "over" && guard--){
    if (!game.playerCard || (!game.aiCard && game.mode !== "endless")){ endGame(); break; }
    game.statKey = game.turnOwner === "ai"
      ? aiChooseStat(game.aiCard, game.aiLevel)
      : STATS[Math.floor(Math.random() * STATS.length)].key;
    settle(game.statKey);
    game.roundsPlayed++;
    if (game.mode === "pvp" && (game.pvp.captures.p1 >= 25 || game.pvp.captures.p2 >= 25)){ game.pvp.matchWinner = game.pvp.captures.p1 >= 25 ? "p1" : "p2"; endGame(); break; }
    if (!game.playerDeck.length){ endGame(); break; }
    if (MODES[game.mode].waves && !game.aiDeck.length){
      game.score += 500 * game.wave; game.wave++;
      game.aiLevel = aiLevelForWave(game.wave);
      game.aiDeck = drawFromBag(Math.min(4 + game.wave, 12));
    }
    game.playerCard = game.playerDeck.length ? game.playerDeck.shift() : null;
    game.aiCard = game.mode === "endless" ? (game.bag.length || game.playerDeck.length ? drawFromBag(1)[0] : null) : (game.aiDeck.length ? game.aiDeck.shift() : null);
  }
  return { mode: game.mode, score: game.score, you: game.playerDeck.length,
    ai: game.aiDeck.length, pot: game.pot.length, rounds: game.roundsPlayed, wave: game.wave };
};
window.__autoplayDuel = function(seed){
  seed = seed || seedForDuel();
  const rng = mulberry32(seed);
  const bag = CARDS.slice();
  for (let i = bag.length - 1; i > 0; i--){ const j = Math.floor(rng() * (i + 1)); [bag[i], bag[j]] = [bag[j], bag[i]]; }
  return bag.slice(0, 12).map(c => c.name);
};
const __roomParam = (function(){ try { const p = new URLSearchParams(location.search); return p.get("room"); } catch(e){ return null; } })();
if (__roomParam){
  const rc = document.getElementById("roomCode");
  if (rc) rc.value = cleanCode(__roomParam);
  openOnlinePanel(true);
}
refreshBests();
updatePlayingAt();
updateOrderHint();
game.demo = false;
Spoons.preloadMyPub();








