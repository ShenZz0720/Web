


// tab栏切换
// 获取元素
const swiper = document.querySelector(".content-left .swiper")
const items  = document.querySelectorAll(".content-left .tab-item")
const picture = document.querySelector('.picture img')
let currentImgSrc = picture.src

// 获取目标li函数
function getTargetLI (target){
  if(target.tagName === 'IMG'){
    return target.closest('li.tab-item')
  }else if (target.tagName === 'LI'){
    return target
  }
  return null
}

// 获取图片路径函数
function getImgSrc(target, parentLi) {
  return target.tagName === 'IMG' 
    ? target.src 
    : parentLi.querySelector('img')?.src;
}


// 鼠标点击切换
swiper.addEventListener('click',function(e){

  const targetLi = getTargetLI(e.target)

  // 防止点击到空白处报错,如果targetLi是 null的话就取反 return 如果获取到的话就不执行return
  if (!targetLi) return 

  // 对每一个item进行处理
  items.forEach(item => {
    item.classList.remove('active')
  })
  targetLi.classList.add('active')

  // 更换图片
  const imgSrc = getImgSrc(e.target,targetLi) 
  picture.src = imgSrc

  // 存储点击的主图
  currentImgSrc = imgSrc
})


// 鼠标经过切换
swiper.addEventListener('mouseover',function(e){
  const targetLi = getTargetLI(e.target)
  if (!targetLi) return 

  const imgSrc = getImgSrc(e.target,targetLi) 
  picture.src = imgSrc
})

// 鼠标离开
swiper.addEventListener('mouseleave',function(e){
  picture.src = currentImgSrc
})





// 加入购物车

// 绑定按钮
const addToCarBtn = document.querySelector('.shopCar')

addToCarBtn.addEventListener('click',function(){
  // 商品名称
  const ProductName = document.querySelector('.content-right .description h1')
  const productName = ProductName.textContent
  // 获取价格
  const priceText = document.querySelector('.content-right-container .description h2').textContent
  console.log(priceText)
  
  const price = parseFloat(priceText.replace('￥',''))
  console.log(price);
  
  // 图片路径
  const imageSrc = document.querySelector('.picture img').src
  // 获取商品id
  const productId = ProductName.getAttribute('data-id')


  // 创建商品对象
  const product = {
    id: productId,
    name: productName,
    price: price,
    image: imageSrc,
    quantity: 1
  }

  // 获取现在购物车的数据
  let cart = JSON.parse(localStorage.getItem('cart')) || []

  // 判断是否存在购物车中
  const existing = cart.findIndex(item => item.id === productId)

  if(existing !== -1){
    // 商品存在 数量  + 1
    cart[existing].quantity += 1
  } else {
    // 商品不存在 将商品追加到购物车中
    cart.push(product)
  }

  localStorage.setItem('cart', JSON.stringify(cart))

})
