$(function () {
  var form = layui.form
  var layer = layui.layer

  initArtCate()

  function initArtCate () {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  $('#tianjia').on('click', function () {
    layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })

  $('body').on('Submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('添加分类失败！')
        }
        initArtCate()
        layui.layer.msg('添加分类成功！')
        layer.closeAll()
      }
    })

  })

  $('tbody').on('click', '.btn-edit', function () {
    layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#bianji').html()
    })

    var id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-bianji', res.data)
      }
    })
  })


  $('body').on('submit', '#form-bianji', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！')
        }
        layer.msg('更新分类数据成功！')
        // layer.close(indexEdit)
        layer.closeAll()
        initArtCate()
      }
    })
  })

  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layui.layer.msg('删除分类成功！')
          initArtCate()
          layer.close(index);
        }
      })
    });
  })
})