async function updateCartBadge() {
  const cartBadge = document.getElementById('cart-badge')

  const currentResponse = await fetch("/api/user/current")
  const user = await currentResponse.json()

  const cartLengthResponse = await fetch(`/api/cart/${user.cartId}`)
  const cart = await cartLengthResponse.json()
  
  cartBadge.innerText = cart.products.length
}

async function addToCart(cartId, productId) {
  const res = await fetch(`/api/cart/${cartId}/${productId}`, { method: 'POST' })

  if (res.status != 200) {
    return
  }

  await updateCartBadge()
}

async function removeFromCart(cartId, productId) {
  const res = await fetch(`/api/cart/${cartId}/${productId}`, { method: 'DELETE' })

  if (res.status != 200) {
    return
  }

  await updateCartBadge()

  const el = document.getElementById(productId)
  el.parentElement.removeChild(el)
}

async function sendOrder(pedidoId) {
  const res = await fetch(`/api/sms/${pedidoId}`, { method: 'POST' })

  if (res.status != 200) {
    return
  }

  const row = document.getElementById(pedidoId)
  const cell = row.children.item(3)

  cell.innerHTML = 'Si'
}

async function removeUser(userId) {
 const user = document.getElementById(`${userId}`)
  const res = await fetch(`/api/user/${userId}`, { method: 'DELETE' })
  if (res.status == 200) {
   return user.innerText = ''
    
  }
 
}



