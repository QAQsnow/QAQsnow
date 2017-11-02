/*****************/
//
var closeAlert=[];
//重写push
Array.prototype.pushAlert = function(){
        for (var i = 0; i < arguments.length; i++) {
        	while(this.length>=1&&!this[this.length-1]){
				this.length=this.length-1;
			}	
            this[this.length] = arguments[i];
        }
        return this.length;
 }
//弹框
var dialog={
	win:top!=self?top:window,
	confirm:function(opts){
		var dialogComfirm = this.win.jqueryAlert($.extend({
		    'title'   : '提示',
		    'content' : '确定删除这条记录吗？',
		    'modal'   : true,
		   	 minWidth:200,
		    'buttons' :{
		        '确定' : function(){
		            dialog.close();
		        },
		        '取消' : function(){
		        	dialog.close();
		        }
		    }
		},opts));
		closeAlert.pushAlert(dialogComfirm);
		return closeAlert.length;
	},
	alert:function(opts){
		var dialogAlert = this.win.jqueryAlert($.extend({
			'style'   : 'wap',
		    'title'   : '提示',
		    'content' : '你没有选择任何选项',
		    'modal'   : true,
		   	 minWidth:200,
		   	 //'isModalClose':true,
		    'buttons' :{
		        '确定' : function(){
		            dialog.close();
		        }
		    }
		},opts));
		closeAlert.pushAlert(dialogAlert);
		return closeAlert.length;
	},
	tips:function(content,src,time){
		 var dialogTips = this.win.jqueryAlert({
		 	'icon':'images/'+(src||'right')+'.png',
		    'content' : content?content:'我不是程序员...',
		   	'closeTime':time||2000
		 });
	},
	close:function(index){
		if(closeAlert&&!closeAlert.length)return;
		if(index){
			closeAlert[index-1].destroy(index);
			closeAlert[index-1]=null;
		}else{
			$.each(closeAlert,function(i,v){
				if(v)v.destroy();
			});
			closeAlert.splice(0);
		}
	}
}