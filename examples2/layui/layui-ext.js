function setCsrfHeaders(xhr) {
    xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"))
}

layui.use(['form', 'layedit', 'laydate'], function(){
	let form=layui.form,laydate =layui.laydate;
	$(".layui-select-ext").each(function(){
		let defaults={
				multiple:false,
				method:'GET',
				url:null,
				valueField:'id',
				textField:'name'
		};
		let options=$.extend(defaults,
				{
			multiple:$(this).data('multiple'),
			method:$(this).data('method'),
			url:$(this).data('url'),
			valueField:$(this).data('valuefield'),
			textField:$(this).data('textfield')
				});
		let select=$(this);
		$.ajax({
			url:options.url,
			method:options.method,
			success:function(data){
				if(data==null||data.length==0){
					return ;
				}
				let htmls=[];
				$.each(data,function(index,row){
					htmls.push("<option value='"+row[options.valueField]+"'>");
					htmls.push(row[options.textField]);
					htmls.push("</option>");
				});
				select.append(htmls.join(""));
				form.render('select');
				
				let value=select.data("value");
				if(!!value){
					select.val(value);
				}
			}
		})
	});
	
	let dateTimeFormat=new Map([['yyyy-MM','month'],['yyyy','year']]);
	
	$('.layui-datetime-ext').each(function(){
		//日期时间范围
		let format=dateTimeFormat.get($(this).data("format"))||'datetime';
		laydate.render({
			elem: this,
			type: format
		});			
	});
});
