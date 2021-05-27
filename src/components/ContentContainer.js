import React from 'react';
import {
  FlatList
} from 'react-native';
import images from '../../assets/images';
import colors from '../../assets/colors';

import PostCard from '../components/PostCard'




const datas = [
  {
    username: 'billgates',
    profile: images.profile.profileGates,
    text:"Love. It's chemical, it's elusive, and ephemeral. It's so powerful that it can be hard to describe...",
    image: images.images.pic1,
    likes: ["Aneel",'Anjith','vamsi','neeraj'],
    comments: ["Aneel",'Anjith','vamsi','neeraj'],
    shares:45,
    date: "2021/5/08",
    groups: ["2018CSEA",'Anjith','vamsi','neeraj']
  },
  {
    username: 'Musk',
    profile: images.profile.profileMusk,
    text:"Love. It's chemical, it's elusive, and ephemeral. It's so powerful that it can be hard to describe...",
    image: images.images.pic4,
    likes: ["Aneel",'Anjith','vamsi','neeraj'],
    comments: ["Aneel",'Anjith','vamsi','neeraj'],
    shares:45,
    date: "2021/5/08",
    groups: ["2018CSEA",'Anjith','vamsi','neeraj']
  },
  {
    username: 'markzuckerberg',
    profile: images.profile.profileMark,
    text:"Love. It's chemical, it's elusive, and ephemeral. It's so powerful that it can be hard to describe...",
    image: images.images.pic5,
    likes: ["Aneel",'Anjith','vamsi','neeraj'],
    comments: ["Aneel",'Anjith','vamsi','neeraj'],
    shares:45,
    date: "2021/5/08",
    groups: ["2018CSEA",'Anjith','vamsi','neeraj']
  },
  
];

export default ( {HeaderComponent,data}) => {
  
  return (
    <FlatList
      data={datas}
      keyExtractor={item => item.username}
      renderItem={PostCard}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={()=><HeaderComponent data={data}/>}
    />
  );
};

