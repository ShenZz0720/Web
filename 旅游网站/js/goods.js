


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