/**
 * 作    者: 张文钦 
 * 版    本: 1.2
 * 完成时间: 2012-02-23 
 * 描    述: fn.storage
 * 关联文件: version.js 
 */
/** 
* @class 提供简单本地存储封装
* @name storage
* @description 提供简单本地存储封装
* @return {storage} 对象
* @version 1.2 
*/
ui.fn.storage = {
    /**
    * @name storage#_s
    * @param {Object}  对象
    * @description 本地存储API接口对象 内部使用
    * @default {Object} 本地存储API接口对象
    */
    _s: window.localStorage,//本地存储对象
    /**  
    * @name storage#set
    * @param {Fn} 函数
    * @description 添加本地存储时使用
    * @example
    * jui.storage.set( key, value );
    */
    set: function( ) {
        var t, ret = {},key,value;
        if ( !this._s ) return;
        if ( arguments.length !==2 ) return;
        key = arguments[0],value = arguments[1];
        t = value.constructor === Array;
        if ( t ) { // 数组
            ret.type = "array";
            ret.data = {};
            ret.length = value.length;
            for ( var i=0; i<value.length; i++ ) {
                ret[ "data" ][ i ] = value[ i ];
            }
            value = JSON.stringify( ret );
        }
        if ( typeof value === "object" ) {
            //认为为普通对象
            value = JSON.stringify( value );
        }
        //认为为普通字面量
        this._s.setItem( key, value );
    },
    /**  
    * @name storage#get
    * @param {Fn} 函数
    * @description 获取或者迭代本地存储中的数据时使用
    * @return 对象 或者 字面值
    * @example
    * jui.storage.get( key );
    * jui.storage.get();
    */
    get: function( ) {
        if ( !this._s ) return null;
        if ( arguments.length !== 1 ) {//认为做迭代操作
            return this._iterate();
        }
        var ret, obj = this._s.getItem( arguments[0] );
        if ( obj.charAt("0") === "{" && obj.charAt( obj.length - 1 ) === "}" ) {
            ret = JSON.parse( obj );
            if( ret.type && ret.type === "array" ) {
                var data = ret["data"],r = [];
                for( var i=0; i< ret.length; i++ ) {
                    r[i] = data[i];
                }
                ret = r;
            }
        } else {
            ret = obj;
        }
        return ret;
    },
    /**  
    * @name storage#_iterate
    * @param {Fn} 函数
    * @description 内部使用,迭代本地存储中的数据并返回对象
    * @example
    * jui.storage._iterate();
    */
    _iterate: function() {
        if ( !this._s ) return;
        var ret = {};
        for( var i=0; i<this._s.length; i++ ) {
            var key = this._s.key( i );
            ret[ key ] = this.get( key );
        }
        return ret;
    }
};
//声明快捷方法
ui.storage = ui.fn.storage;