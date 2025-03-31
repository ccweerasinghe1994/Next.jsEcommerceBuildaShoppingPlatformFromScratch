"use server";

import {TCart, TCartItem} from "@/types";
import {cookies} from "next/headers";
import {formatErrors, prismaObjectToPlainObject, round2} from "@/lib/utils";
import {auth} from "@/auth";
import {prisma} from "@/db/prisma";
import {cartItemSchema, insertCartSchema} from "@/lib/validations/validators";
import {revalidatePath} from "next/cache";

type TResponse = {
  success: boolean;
  message: string;
};

function calculatePrice(cartItems:TCartItem[]) {
    const totalItemPrice = round2(cartItems
        .reduce((acc:number,item)=> acc+ (Number(item.price)*item.qty),0));
    const totalTaxPrice = round2(
        cartItems.reduce((acc:number,item)=>acc+(Number(item.price)*0.15*item.qty),0)
    );
    const totalShippingPrice = round2(totalItemPrice < 100 ? 10 :0 );
    const totalPrice = round2(totalItemPrice+totalShippingPrice+totalTaxPrice);

    return {
      itemsPrice: totalItemPrice.toFixed(2),
      taxPrice: totalTaxPrice.toFixed(2),
      shippingPrice: totalShippingPrice.toFixed(2),
      totalPrice:totalPrice.toFixed(2)
    }
}


export async function addItemToCart(cartitem: TCartItem): Promise<TResponse> {

  try {
    // check if session cart id exists
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) {
      throw new Error("Session cart id not found");
    }

    //  get session and user id
    const session = await auth();
    const userId = session?.user?.id;

    // get the cart
    const cart = await getCartItems();

    // validate the cart item
    const validatedCartItem = cartItemSchema.parse(cartitem);

    // get the product if from the database
    const productFromDatabase = await prisma.product.findFirst({
      where:{
        id:validatedCartItem.productId
      }
    })
    if (!productFromDatabase){
      throw new Error("product not found")
    }

    if (!cart){
      const newCart = insertCartSchema.parse({
        userId,
        sessionCartId,
        items:[validatedCartItem],
        ...calculatePrice([validatedCartItem])
      });

      await prisma.cart.create({
        data:newCart
      });

    //   revalidate the product page
      revalidatePath(`/product/${productFromDatabase.slug}`)
    }

    return {
      message: "user added successfully",
      success: true,
     };

  }catch (error) {

     return {
        message: formatErrors(error),
        success: false,
    }

  }
}

export async function getCartItems():Promise<TCart | undefined>{
  //  find the session cookie id
  const allCookies = await cookies();
  const cartSessionId = allCookies.get("sessionCartId")?.value;

  if(!cartSessionId){
    throw new Error("Session cart id is not defined")
  }

//   get session and user id
  const session = await  auth();

  const userId = session?.user?.id;

  const cart =await prisma.cart.findFirst({
      where: userId ? {userId:userId} :{sessionCartId:cartSessionId}
    })
  if (!cart) return undefined;

  return prismaObjectToPlainObject({
    ...cart,
    items:cart.items as TCartItem[],
    itemsPrice:cart.itemsPrice.toString(),
    taxPrice:cart.taxPrice.toString(),
    shippingPrice:cart.shippingPrice.toString(),
    totalPrice:cart.totalPrice.toString(),
  })
}