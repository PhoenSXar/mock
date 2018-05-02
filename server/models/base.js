const mock = require('../mock.js');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

/**
 * 所有的model都需要继承baseModel, 且需要 getSchema和getName方法，不然会报错
 */

class baseModel{
    constructor(){
        this.schema = new mongoose.Schema(this.getSchema());
        this.name = this.getName();

        if(this.isNeedAutoIncrement() === true){
            this.schema.plugin(autoIncrement.plugin, {
                model: this.name,
                field: this.getPrimaryKey(),
                startAt: 11,
                incrementBy: mock.commons.rand(1, 10)
            });
        }
        
        this.model = mock.db(this.name, this.schema);
    }

    isNeedAutoIncrement(){
        return true;
    }

    /**
     * 可通过覆盖此方法生成其他自增字段
     */
    getPrimaryKey(){
        return '_id';
    }
    
    /**
     * 获取collection的schema结构
     */
    getSchema(){
        mock.commons.log('Model Class need getSchema function', 'error');
    }

    getName(){
        mock.commons.log('Model Class need name', 'error');
    }
}

module.exports = baseModel;