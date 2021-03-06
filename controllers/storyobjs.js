/**
 * Created by salpy on 2014-02-11.
 */


var storyId = 1;


var StoryNode = Object.create(null);
StoryNode.prototype = {
    getId:function(){
        if (!this.id)
            return storyId++;
        else
            return this.id;
    },
    toString: function(){
        return 'ID: '+this.id+' Title: '+this.title+ ' Text: '+this.text+' Choices: '+this.choices;
    }
}


function createStoryNode(){
    var sn = Object.create(StoryNode.prototype, {
        id:{writable: true, configurable: true, enumerable: true, value: null},
        title:{writable: true, configurable: true, enumerable: true, value:''},
        text:{writable: true, configurable: true, enumerable: true, value:''},
        choices:{writable: true, configurable: true, enumerable: true, value:[]}
    });
    sn.id = sn.getId();
    return sn;
}


function createChoiceNode(){
    return {
        id: -1, //maybe NodeID_choice#
        text: '',
        type: 1, //for handlebars
        parentNodeId: -1, //a StoryNode
        nextNodeId: -1
    }
}


function convertFromJSON(json, proto){
    var obj = JSON.parse(json);
    var nn;
    if(proto == 'StoryNode'){
        nn = createStoryNode();
    }else if (proto == 'Choice'){
        nn = createChoiceNode();
    } else{
        return null;
    }
    for (var key in obj){
        if(nn.hasOwnProperty(key)){
            nn[key] = obj[key];
        }
    }
    return nn;
}

function setStart(val){
    storyId = parseInt(val,10) + 1;
}


function getId(){
    return storyId;
}

exports.StoryNode = createStoryNode;
exports.Choice = createChoiceNode;
exports.convert = convertFromJSON;
exports.setStart = setStart;
exports.getCurId = getId;

