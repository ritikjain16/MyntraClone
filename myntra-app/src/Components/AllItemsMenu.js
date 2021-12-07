import React from "react";
import Accordian, { Linkmenuitem } from "./Accordian";

const AllItemsMenu = () => {
  return (
    <div className="container m-3">
      <div className="accordion accordion-flush" id="allitems">
        <Accordian
          h1="a1"
          id="al1"
          name="Men"
          mainId="allitems"
          body={
            <>
              <div className="accordion accordion-flush" id="men">
                <Accordian
                  h1="m1"
                  id="ml1"
                  name="Topwear"
                  mainId="men"
                  body={
                    <>
                      <Linkmenuitem
                        name="T-Shirts"
                        gc="MEN"
                        cc="MEN_T-SHIRTS"
                      />
                      <Linkmenuitem
                        name="Caual Shirts"
                        gc="MEN"
                        cc="MEN_CASUAL_SHIRTS"
                      />
                      <Linkmenuitem
                        name="Formal Shirts"
                        gc="MEN"
                        cc="MEN_FORMAL_SHIRTS"
                      />
                      <Linkmenuitem
                        name="Sweatshirts"
                        gc="MEN"
                        cc="MEN_SWEATSHIRTS"
                      />
                      <Linkmenuitem
                        name="Sweaters"
                        gc="MEN"
                        cc="MEN_SWEATERS"
                      />
                      <Linkmenuitem name="Jackets" gc="MEN" cc="MEN_JACKETS" />
                      <Linkmenuitem
                        name="Blazer & Coats"
                        gc="MEN"
                        cc="MEN_BLAZER_COATS"
                      />
                      <Linkmenuitem name="Suits" gc="MEN" cc="MEN_SUITS" />
                      <Linkmenuitem
                        name="Rain Jackets"
                        gc="MEN"
                        cc="MEN_RAIN_JACKETS"
                      />
                    </>
                  }
                />
                <Accordian
                  h1="m2"
                  id="ml2"
                  name="Indian & Festive Wear"
                  mainId="men"
                  body={
                    <>
                      <Linkmenuitem
                        name="Kurtas & Kurta Sets"
                        gc="MEN"
                        cc="MEN_KURTAS"
                      />
                      <Linkmenuitem
                        name="Sherwanis"
                        gc="MEN"
                        cc="MEN_SHERWANIS"
                      />
                      <Linkmenuitem
                        name="Nehru Jackets"
                        gc="MEN"
                        cc="MEN_NEHRU_JACKETS"
                      />
                      <Linkmenuitem name="Dhotis" gc="MEN" cc="MEN_DHOTIS" />
                    </>
                  }
                />
                <Accordian
                  h1="m3"
                  id="ml3"
                  name="Bottomwear"
                  mainId="men"
                  body={
                    <>
                      <Linkmenuitem name="Jeans" gc="MEN" cc="MEN_JEANS" />
                      <Linkmenuitem
                        name="Casual Trousers"
                        gc="MEN"
                        cc="MEN_CASUAL_TROUSERS"
                      />
                      <Linkmenuitem
                        name="Formal Trousers"
                        gc="MEN"
                        cc="MEN_FORMAL_TROUSERS"
                      />
                      <Linkmenuitem name="Shorts" gc="MEN" cc="MEN_SHORTS" />
                      <Linkmenuitem
                        name="Track Pants & Joggers"
                        gc="MEN"
                        cc="MEN_TRACK_PANTS_JOGGERS"
                      />
                    </>
                  }
                />
                <Accordian
                  h1="m4"
                  id="ml4"
                  name="Innerwear & Sleepwear"
                  mainId="men"
                  body={
                    <>
                      <Linkmenuitem
                        name="Briefs & Trunks"
                        gc="MEN"
                        cc="MEN_BRIEFS_TRUNKS"
                      />
                      <Linkmenuitem name="Boxers" gc="MEN" cc="MEN_BOXERS" />
                      <Linkmenuitem name="Vests" gc="MEN" cc="MEN_VESTS" />
                      <Linkmenuitem
                        name="Sleepwear & Loungewear"
                        gc="MEN"
                        cc="MEN_SLEEPWEAR_LOUNGEWEAR"
                      />
                      <Linkmenuitem
                        name="Thermals"
                        gc="MEN"
                        cc="MEN_THERMALS"
                      />
                    </>
                  }
                />
                <Linkmenuitem name="Plus Size" gc="MEN" cc="MEN_PLUS_SIZE" />
                <Accordian
                  h1="m5"
                  id="ml5"
                  name="Footwear"
                  mainId="men"
                  body={
                    <>
                      <Linkmenuitem
                        name="Casual Shoes"
                        gc="MEN"
                        cc="MEN_CASUAL_SHOES"
                      />
                      <Linkmenuitem
                        name="Sports Shoes"
                        gc="MEN"
                        cc="MEN_SPORTS_SHOES"
                      />
                      <Linkmenuitem
                        name="Formal Shoes"
                        gc="MEN"
                        cc="MEN_FORMAL_SHOES"
                      />
                      <Linkmenuitem
                        name="Sneakers"
                        gc="MEN"
                        cc="MEN_SNEAKERS"
                      />
                      <Linkmenuitem
                        name="Sandals & Floaters"
                        gc="MEN"
                        cc="MEN_SANDALS_FLOATERS"
                      />
                      <Linkmenuitem
                        name="Flip Flops"
                        gc="MEN"
                        cc="MEN_FLIP_FLOPS"
                      />
                      <Linkmenuitem name="Socks" gc="MEN" cc="MEN_SOCKS" />
                    </>
                  }
                />
                <Linkmenuitem
                  name="Personal Care & Grooming"
                  gc="MEN"
                  cc="MEN_PERSONAL_CARE_GROOMING"
                />
                <Linkmenuitem
                  name="Sunglasses & Frames"
                  gc="MEN"
                  cc="MEN_SUNGLASSES_FRAMES"
                />
                <Linkmenuitem name="Watches" gc="MEN" cc="MEN_WATCHES" />
                <Accordian
                  h1="m6"
                  id="ml6"
                  name="Sports & Active Wear"
                  mainId="men"
                  body={
                    <>
                      <Linkmenuitem
                        name="Sports Shoes"
                        gc="MEN"
                        cc="MEN_SPORTS_SHOES"
                      />
                      <Linkmenuitem
                        name="Sports Sandals"
                        gc="MEN"
                        cc="MEN_SPORTS_SANDALS"
                      />
                      <Linkmenuitem
                        name="Active T-shirts"
                        gc="MEN"
                        cc="MEN_ACTIVE_T-SHIRTS"
                      />
                      <Linkmenuitem
                        name="Track Pants & Shorts"
                        gc="MEN"
                        cc="MEN_TRACK_PANTS_SHORTS"
                      />
                      <Linkmenuitem
                        name="Tracksuits"
                        gc="MEN"
                        cc="MEN_TRACKSUITS"
                      />
                      <Linkmenuitem
                        name="Jackets & Sweatshirts"
                        gc="MEN"
                        cc="MEN_SWEATSHIRTS"
                      />
                      <Linkmenuitem
                        name="Sports Accessories"
                        gc="MEN"
                        cc="MEN_SPORTS_ACCESSORIES"
                      />
                      <Linkmenuitem
                        name="Swimwear"
                        gc="MEN"
                        cc="MEN_SWIMWEAR"
                      />
                    </>
                  }
                />
                <Accordian
                  h1="m7"
                  id="ml7"
                  name="Gadgets"
                  mainId="men"
                  body={
                    <>
                      <Linkmenuitem
                        name="Smart Wearables"
                        gc="MEN"
                        cc="MEN_WEARABLES"
                      />
                      <Linkmenuitem
                        name="Fitness Gadgets"
                        gc="MEN"
                        cc="MEN_FITNESS_GADGETS"
                      />
                      <Linkmenuitem
                        name="Headphones"
                        gc="MEN"
                        cc="MEN_HEADPHONES"
                      />
                      <Linkmenuitem
                        name="Speakers"
                        gc="MEN"
                        cc="MEN_SPEAKERS"
                      />
                    </>
                  }
                />
                <Accordian
                  h1="m8"
                  id="ml8"
                  name="Fashion Accessories"
                  mainId="men"
                  body={
                    <>
                      <Linkmenuitem name="Wallets" gc="MEN" cc="MEN_WALLETS" />
                      <Linkmenuitem name="Belts" gc="MEN" cc="MEN_BELTS" />
                      <Linkmenuitem
                        name="Perfumes & Body Mists"
                        gc="MEN"
                        cc="MEN_PERFUMES"
                      />
                      <Linkmenuitem
                        name="Trimmers"
                        gc="MEN"
                        cc="MEN_TRIMMERS"
                      />
                      <Linkmenuitem
                        name="Deodrants"
                        gc="MEN"
                        cc="MEN_DEODRANTS"
                      />
                      <Linkmenuitem
                        name="Ties, Cliffs & Pocket Squares"
                        gc="MEN"
                        cc="MEN_TIES_CLIFFS_POCKET_SQUARES"
                      />
                      <Linkmenuitem
                        name="Accessory Gift Sets"
                        gc="MEN"
                        cc="MEN_ACCESSORY_GIFT_SETS"
                      />
                      <Linkmenuitem
                        name="Caps & Hats"
                        gc="MEN"
                        cc="MEN_CAPS_HATS"
                      />
                      <Linkmenuitem
                        name="Mufflers, scarves & Gloves"
                        gc="MEN"
                        cc="MEN_MUFFLERS_SCARVES_GLOVES"
                      />
                      <Linkmenuitem
                        name="Phone Cases"
                        gc="MEN"
                        cc="MEN_PHONE_CASES"
                      />
                      <Linkmenuitem
                        name="Rings & Wristwear"
                        gc="MEN"
                        cc="MEN_RINGS_WRISTWEAR"
                      />
                      <Linkmenuitem name="Helmets" gc="MEN" cc="MEN_HELMETS" />
                    </>
                  }
                />
                <Linkmenuitem
                  name="Bags & Backpacks"
                  gc="MEN"
                  cc="MEN_BAGS_BACKPACKS"
                />
                <Linkmenuitem
                  name="Luggages & Trolleys"
                  gc="MEN"
                  cc="MEN_LUGGAGES_TROLLEYS"
                />
              </div>
            </>
          }
        />
        <Accordian
          h1="a2"
          id="al2"
          name="Women"
          mainId="allitems"
          body={
            <>
              <div className="accordion accordion-flush" id="women">
                <Accordian
                  h1="w1"
                  id="wl1"
                  name="Topwear"
                  mainId="women"
                  body={
                    <>
                      <Linkmenuitem
                        name="Women Kurtas"
                        gc="WOMEN"
                        cc="WOMEN_KURTAS"
                      />
                    </>
                  }
                />
                <Accordian
                  h1="w2"
                  id="wl2"
                  name="Bottomwear"
                  mainId="women"
                  body={
                    <>
                      <Linkmenuitem
                        name="Women Jeans"
                        gc="WOMEN"
                        cc="WOMEN_JEANS"
                      />
                    </>
                  }
                />
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default AllItemsMenu;
