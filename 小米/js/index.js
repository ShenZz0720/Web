

// 返回顶部按钮
function backTop(){
  // 获取元素
  const top = document.querySelector('.top')

  const scrollTop = document.querySelector('.content')

  window.addEventListener('scroll',function(){
    const n = document.documentElement.scrollTop

    // console.log(n)
    // console.log(scrollTop.offsetTop)
    
    if (n >= 100) {
      top.style.opacity = 1
    } else {
      top.style.opacity = 0
    }
  })

  const backTop = document.querySelector('.backTop')
  backTop.addEventListener('click',function(){
    document.documentElement.scrollTop = 0
  })
}

// 页脚轮播图
(function(){
  // 获取元素
  const nofo1 = document.querySelector('.info-links .img1')
  const nofo2 = document.querySelector('.info-links .img2')


  // 封装函数
  function toggleImages (img1,img2){
    if(img1.style.display == 'none'){
      img1.style.display = 'inline-block'
      img2.style.display = 'none'
    } else {
      img1.style.display = 'none'
      img2.style.display = 'inline-block'      
    }
  }
  
  // 设置定时器
  setInterval(function(){
    toggleImages(nofo1,nofo2)
  },1000)

})();


  window.addEventListener('scroll',function(){
    backTop()
  })
