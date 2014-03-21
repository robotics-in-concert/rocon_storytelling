var namespace = (function(){
    var namespace = {};
 
    var i  = 0;
 
    function func1(){ //내부 함수
        alert(i);      
    };
    namespace.func2 = function(){ //외부 노출 함수
        alert(i);      
    };
   
    return namespace;
})();