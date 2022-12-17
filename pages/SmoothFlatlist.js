import * as React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions,TouchableOpacity, FlatList } from 'react-native';

const {width, height} = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    "key": "3571572",
    "title": "Multi-lateral intermediate moratorium",
    "description": "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    "image": "https://cdn-icons-png.flaticon.com/512/3571/3571892.png"
  },
  {
    "key": "3571747",
    "title": "Automated radical data-warehouse",
    "description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    "image": "https://cdn-icons-png.flaticon.com/512/3571/3571528.png"
  },
  {
    "key": "3571680",
    "title": "Inverse attitude-oriented system engine",
    "description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    "image": "https://cdn-icons-png.flaticon.com/512/3571/3571555.png"
  },
  {
    "key": "3571603",
    "title": "Monitored global data-warehouse",
    "description": "We need to program the open-source IB interface!",
    "image": "https://cdn-icons-png.flaticon.com/512/3571/3571572.png"
  }
]


  const Indicator =({scrollX}) =>{
   
    return <View style={{position:'absolute',bottom:100,flexDirection:'row'}}>
      {DATA.map((_,i) => {
          const inputRange = [(i-1) * width,i*width,(i+1) * width];
         const scale = scrollX.interpolate({
          inputRange,
          outputRange:[0.8,1.4,0.8],
          extrapolate:'clamp'
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange:[0.6,0.9,0.4],
          extrapolate:'clamp'
        });
        return <Animated.View
        key={`indicator-${i}`}
          style={{
            height:10,
            width:10,
            borderRadius:5,
            backgroundColor:'#333',
            margin:10,
            opacity,
            transform:[{
              scale
            }]
          }}
        
        />
         
      })}
    </View>
  }

  const Backdrop = ({scrollX}) => {
 
    const backgroundColor = scrollX.interpolate({
      inputRange:bgs.map((_,i) => i*width),
      outputRange: bgs.map((bg) => bg),
    });
    return <Animated.View
    style={[
      StyleSheet.absoluteFill,
      {
      
      backgroundColor
    }]}
    />
  }


  const Square = ({scrollX}) =>{
    
    const YOLO = Animated.modulo(
      Animated.divide(Animated.modulo(scrollX,width),new Animated.Value(width)),
      1
    )
    const rotate = YOLO.interpolate({
      inputRange:[0,0.5,1],
      outputRange:['-35deg','35deg','-35deg'],
    })

    return <Animated.View style={{
      width:height,
      height:height,
      backgroundColor:'#fff',
      borderRadius:86,
      position:'absolute',
      top:-height * 0.6,
      left:-height * 0.3,
      transform:[{
        rotate:'35deg',
      }]
    }}>

    </Animated.View>  
  }
export default function SmoothFlatlist() {
  const scrollX = React.useRef(new Animated.Value(0)).current;




  const renderItem = ({item}) => <View style={{width,alignItems:'center',padding:20}}>
  <View style={{flex:0.7,justifyContent:'center'}}>
  <Image source={{uri:item.image}} style={{width:width/ 2, height:width / 2,resizeMode:'contain'}}/>
  </View>
  <View style={{flex:0.3}}>
    <Text style={{fontWeight:'800',fontSize:28,marginBottom:10,color:'#fff',marginTop:10}}>{item.title}</Text>
    <Text style={{fontWeight:'300',color:'#fff'}}>{item.description}</Text>
  </View>
</View>

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX}/>
      <Square/>
      <Animated.FlatList 
      data={DATA}
      horizontal
      pagingEnabled
      scrollEventThrottle={32}
      onScroll={Animated.event([{
      nativeEvent:{contentOffset:{x : scrollX}}}],
      {useNativeDriver:false}
      )}
      contentContainerStyle={{paddingBottom:100}}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.key}
      renderItem={renderItem}/>
      <Indicator scrollX={scrollX}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});