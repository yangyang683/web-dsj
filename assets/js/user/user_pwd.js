$(function () {
  var form = layui.form
  var layer = layui.layer

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    sampwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码一样!'
      }
    },
    repwdd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一样!'
      }
    }
  })


  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功!')
        $('.layui-form')[0].reset()
        layer.alert('再次登录?', function (index) {
          localStorage.removeItem('token')
          window.parent.location.href = '/login.html'
          layer.close(index);
        })

      }
    })
  })
})