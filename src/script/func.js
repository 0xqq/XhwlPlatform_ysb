/**
 * 存储localStorage
 */
import Vue from 'vue'
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
//sessionStorage 部分
/**
 * 存储localStorage
 */
export const setSession = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}
/**
 * 获取localStorage
 */
export const getSession = name => {
	if (!name) return;
	return window.sessionStorage.getItem(name);
}
/**
 * 删除localStorage
 */
export const removeSession = name => {
	if (!name) return;
	window.sessionStorage.removeItem(name);
}
// 表格的导出功能
	   var idTmr;  
        function  getExplorer() {  
            var explorer = window.navigator.userAgent ;  
            //ie  
            if (explorer.indexOf("MSIE") >= 0) {  
                return 'ie';  
            }  
            //firefox  
            else if (explorer.indexOf("Firefox") >= 0) {  
                return 'Firefox';  
            }  
            //Chrome  
            else if(explorer.indexOf("Chrome") >= 0){  
                return 'Chrome';  
            }  
            //Opera  
            else if(explorer.indexOf("Opera") >= 0){  
                return 'Opera';  
            }  
            //Safari  
            else if(explorer.indexOf("Safari") >= 0){  
                return 'Safari';  
            }  
        }  
        function method5(tableid) {  
            if(!!window.ActiveXObject || "ActiveXObject" in window)  
            {  
            var curTbl = document.getElementById(tableid); 
            alert("请切换非IE浏览器进行表格导出")  
            var oXL = new ActiveXObject("Excel.Application");  
            var oWB = oXL.Workbooks.Add();  
            var oSheet = oWB.ActiveSheet;  
            var Lenr = curTbl.rows.length;  
            for (i = 0; i < Lenr; i++)  
            {        var Lenc = curTbl.rows(i).cells.length;  
                for (j = 0; j < Lenc; j++)  
                {  
                    oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;  
                }  
            }  
            oXL.Visible = true; 
            }  
            else  
            {  
                tableToExcel(tableid)  
            }
        }  
        function Cleanup() {  
            window.clearInterval(idTmr);  
            CollectGarbage();  
        }  
       var tableToExcel = (function() {  
            var uri = 'data:application/vnd.ms-excel;base64,',  
                    template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',  
                    base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },  
                    format = function(s, c) {  
                        return s.replace(/{(\w+)}/g,  
                                function(m, p) { return c[p]; }) }  
            return function(table, name) {  
                if (!table.nodeType) table = document.getElementById(table)  
                var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}  
                window.location.href = uri + base64(format(template, ctx))  
            }  
        })()  
export default {
	getExplorer,
    method5,
	Cleanup,
	tableToExcel
}
