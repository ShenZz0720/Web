
document.addEventListener('DOMContentLoaded',function(){

  renderCar()

// ------------------------------函数--------------------------------------
  // 渲染购物车函数
  function renderCar (){
    console.log('渲染',);
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const cartContainer = document.querySelector('.car-items .items')
    const contentLeft = document.querySelector('.content-left')
  // 先清空原有 再渲染
    cartContainer.innerHTML = ''

    if(cart.length === 0){
      // 如果购物车是空 提示用户
      cartContainer.innerHTML = `<h2 class="empty-cart">购物车为空，快去选购商品吧！</h2>`
      return
    }

    cart.forEach(item => {
      // 创建li
      const carItem = document.createElement('li')
      // 商品的名称
      carItem.className = 'tab-item'
      // 商品的id
      carItem.dataset.id = item.id

      // 直接就是一个复制粘贴   把做好的样式复制过来就行了 
    carItem.innerHTML = `
          <div class="item-container">
            <div class="select">
              <input type="checkbox" class="ck">
            </div>
            <img src="${item.image}" alt="${item.name}">
            <div class="quantity_container">
              <div class="name"><h2>${item.name}</h2></div>
              <div class="quantity">
                <div class="decrease operate">-</div>
                <input type="text" value="${item.quantity}" class="number">
                <div class="increase operate">+</div>
              </div>
            </div>
          </div>
          <div class="value">
            <h3>￥${item.price.toFixed(2)}</h3>
          </div>
        `
      // 将创建的商品追加给父节点
      cartContainer.appendChild(carItem)
    })
  }

  // 判断全选状态函数
  function updateCheckAll() {
    // 将所有的复选框存到一个数组
    const checks = document.querySelectorAll('.ck')

    // 如果购物车为0 则取消全选
    if(checks.length === 0){
      checkAll.checked = false
      return
    }

    const checkedCount = document.querySelectorAll('.ck:checked').length
    // 如果所有被选中的复选框数量 = 所有的复选框数量 则 = true
    checkAll.checked = (checkedCount === checks.length) 
  }


  // 计算价格函数
  function updateTotal() {
    let total = 0 
    document.querySelectorAll('.tab-item').forEach(item => {
      // 获取元素
      const priceText = item.querySelector('.value h3').textContent
      // 转数字类型
      const price = parseFloat(priceText.replace('￥',''))
      // 获取数量
      const quantity = parseInt(item.querySelector('.number').value)
      // 获取是否选中
      const checkbox = item.querySelector('.ck') 
  
      // 计算价格
      if(checkbox.checked) {
        total += price * quantity
      }
    })
  
    // 更新价格
    document.querySelector('.carSum .right').textContent = '￥' + total.toFixed(2)
    document.querySelector('.sum .right').textContent = '￥' + total.toFixed(2)
  
  }

// ----------------------------------------按钮-------------------------------------------------------------


  // 数量按钮
  // 获取元素
  const increase = document.querySelectorAll('.increase')
  increase.forEach(button => {
    button.addEventListener('click',function(){
      const input = this.previousElementSibling
      // console.log(input)
      // 通过是否包含这个类名判断
      if(input.classList.contains('number')){
        // value + 1       转数字
        input.value = parseInt(input.value) + 1
        // 更新价格
        updateTotal()
      }
    })
  })
  
  const decrease = document.querySelectorAll('.decrease')
  decrease.forEach(button => {
    button.addEventListener('click',function(){
      const input = this.nextElementSibling
      // console.log(input)
      // 通过是否包含这个类名判断
      if(input.classList.contains('number')){
        // value - 1       转数字
        const newValue = parseInt(input.value)
        // 判断数量是否大于1
        if(newValue > 1){
          input.value = newValue - 1
        }
        // 更新价格
        updateTotal()
      }
    })
  })
    

  // 删除按钮
  // 绑定按钮
  const deleteBtn = document.querySelector('.delete')
  deleteBtn.addEventListener('click',function(){
    // 获取所有选中商品
    const selectedItems = document.querySelectorAll('.ck:checked')

    let cart = JSON.parse(localStorage.getItem('cart')) || []

    // 需要获取每一个
    selectedItems.forEach(checkbox => {
        // 获取商品ID
        const itemElement = checkbox.closest('.tab-item')
        if (!itemElement) return
        
        const id = itemElement.dataset.id
        
        // 从购物车数据中移除该商品
        cart = cart.filter(item => item.id !== id)
        
        // 从DOM中移除元素
        itemElement.remove()
    })

    // 更新数据
    localStorage.setItem('cart', JSON.stringify(cart))   
    // console.log(cart)
    //  重新渲染价格 购物车 全选
    renderCar()
    updateCheckAll()
    updateTotal()
  })

  
  // 全选
  // 获取元素
  const checkAll = document.querySelector('.check-box .checkAll')
  const cks = document.querySelectorAll('.ck')
  
  checkAll.addEventListener('click',function(){
    // console.log(this.checked);
    // 遍历每个小复选框
    cks.forEach(checkbox => {
      checkbox.checked = this.checked;
    })

  updateTotal()
  })
  

  // 遍历每个小复选框
  cks.forEach(checkbox => {
    checkbox.addEventListener('click', function() {
      // 检查是否全选
      checkAll.checked = (document.querySelectorAll('.ck:checked').length === cks.length)
      // 更新价格
      updateTotal()
    })
  })

// ====================实时渲染==============================================

  // 通过storage事件来实现购物车的实时更新
  window.addEventListener('storage',function(e){
  if(e.key === 'cart'){
    renderCar ()
    updateCheckAll()
    updateTotal()
  }
})

  // 加载初始价格
  updateTotal()
})



