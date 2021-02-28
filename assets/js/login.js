$(function () {
  $('#link-login').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#reg-login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })


  var form = layui.form
  var layer = layui.layer

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致! '
      }
    }
  })

  $('#reg-l').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#reg-l [name=username]').val(),
      password: $('#reg-l [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      layer.msg('注册成功,请登录!')
      $('#reg-login').click()
    })
  })

  $('#login-l').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'post',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        layui.layer.msg('登陆成功!')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})