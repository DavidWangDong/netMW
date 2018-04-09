class Validate {
    constructor(params) {
        
    }

    empty_validate (param) {
        const types = typeof param;

        switch (types) {
          case 'string':
            if (param) {
                return true;
            }
            return false;
            break;
          case 'number':
          if (param>0){
              return true
          }
          return false;
          break;
          case 'object':
          if (Object.prototype.toString.call(param) == "[object Array]") {
             if (param.length<=0) {
                 return false;
             }
             return true;
          }
          if (Object.prototype.toString.call(param) == "[object Object]") {
              if (Object.keys(param).length<=0){
                return false;
              }
              return true
          }
          break;
          default:
            return false;
          break;
        }
    }

    regx_validate (reg,strings) {
        if (typeof strings !=='string') return false;
        return reg.test(strings);
    }
}

export default Validate;