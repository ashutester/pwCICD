import {test, expect} from "@playwright/test"
import { assert } from "node:console";

test("This is saucetest", async({request})=>{
    const resp = await request.get("https://dummyjson.com/products",);
    const body = await resp.json();
    expect (resp.status()).toBe(200);
    let found: boolean = false;
    for (const ele of body.products){
        
        if(ele.title === 'Kiwi'){
            console.log(ele.dimensions.width)
            
            if(ele.dimensions.width===19.4){
                found=true;
                break;
            }
            //break;
            
        }
  
    }
    
    expect(found).toBe(true);  

})