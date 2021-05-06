import React,{Component, useDebugValue} from 'react';
import {AppRegistry,FlatList,Image,Text,View,StyleSheet, Switch, Alert, TouchableHighlight} from 'react-native';
import flatListData from '../data/FlatListData';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';

class FlatListItem extends Component{
    constructor(props){
        super(props);
        this.state={
            activeRowkey:null
        }
      
    }
    render(){
        const swipeSettings={
            autoClose:true,
            onClose:(secId,rowId,direction)=>{
                if(this.state.activeRowkey!=null){
                    this.setState({activeRowkey:null});
                }
            },
            onOpen:(secId,rowId,direction)=>{
                this.setState({activeRowkey:this.props.item.key})
            },
            right:[
                {
                    onPress:()=>{
                        const deletingRow = this.state.activeRowkey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want do delete ?',
                            [
                                {text:'NO',onPress: () => console.log('Cancel Pressed'), style:'cancel'},
                                {text:'Yes',onPress: () =>{
                                    flatListData.splice(this.props.index,1);
                                    //Refesh FlatList .
                                    this.props.parentFlatList.refreshFlatList(deletingRow);
                                }},
                            ],
                            {cancelable:true}

                        );
                    },
                    text:'Delete',type:'delete'
                }
            ],
            rowId:this.props.index,
            sectionId:1,
        }
        return(
            <Swipeout{...swipeSettings} >
                 <View style={styles.flatItemWrap}>
                <View style={styles.flatListItem}>
                    <View style={styles.flatItemLeft}>
                        <View  >
                            <Text style={styles.flatListItemText}>{this.props.item.time}</Text>
                            
                        </View>
                        <Text style={styles.flatListItemTextTiny}>{this.props.item.note}</Text>
                    </View>
                    <View style={styles.flatItemRight}>
                        <Switch></Switch> 
                    </View>

                
                </View>
                <View style={styles.boderline}></View>
            </View>
            </Swipeout>
           
            
            
        )
    }
}
const styles= StyleSheet.create({
    flatItemWrap:{
        backgroundColor:'mediumseagreen',

    },
    flatListItemText:{
        color:'white',
        paddingVertical:10,
        fontSize:46,
    },
    flatListItemTextTiny:{
        color:'white',
        fontSize:16,
    },
    flatListItem:{
       
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
    },
    flatListAlarm:{
        flex:1,
        marginTop:22,
        backgroundColor:'red'
    },
    boderline:{
        height:1,
        backgroundColor:'#222222',
        marginTop:10,
    },
    editText:{
        fontSize:16,
        color:'#ffd615',
    }
})



class FlatListAlarm extends Component{
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state=({
            deleteRowKey:null
        })
        // this._onPressAdd=this._onPressAdd.bind(this);
    }
    refreshFlatList =(deletedKey)=>{
        this.setState((prevState)=>{
            return {
                deleteRowKey:deletedKey
            }
        });
    }
    _onPressAdd =()=>{
        this.myRef.current.showAddModal();
        // this.refs.addModel.showAddModel();
    }
    render(){
        return(
            <View style={styles.flatListAlarm}>
                <View style={{backgroundColor:'tomato',height:64}}>
                    <TouchableHighlight
                        style={{flex:1,margin:0}}
                        underlayColor='tomato'
                        onPress={this._onPressAdd}
                    >
                       <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10}}>
                        <Text style={styles.editText}>Edit</Text> 
                        
                        <Image source={require('../../assets/plus.png')}></Image>
                       </View>
                    </TouchableHighlight>

                </View>
                <FlatList
                    data={flatListData}
                    renderItem={({item,index})=>{
                        return(
                            <FlatListItem item={item} index={index} parentFlatList={this}></FlatListItem>
                        )
                    }}
                ></FlatList>
                <AddModal ref={this.myRef} parentFlatList={this}></AddModal>
            </View>
                
        )
    }
}
export default FlatListAlarm;