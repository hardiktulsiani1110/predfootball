/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {getGroupInfo} from '../../functions/chats';

const ViewMembersScreen = ({navigation, route}) => {
  const auth = useSelector(state => state.auth);
  const {groupId, groupName} = route.params;
  const [members, setMembers] = useState([]);
  const [admin, setAdmin] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getGroupPeople = () => {
    setIsLoading(true);
    getGroupInfo(groupId)
      .then(res => {
        // console.log(res.data);
        setMembers(res.data.members);
        setAdmin(res.data.admin);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getGroupPeople();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.page2}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" type="antdesign" size={30} color="white" />
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginTop: '15%'}}>
        <Text style={styles.heading}>{groupName}</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: '5%', marginBottom: '5%'}}>
        <Text style={styles.heading2}>Members</Text>
      </View>
      <ScrollView>
        <TouchableOpacity
          style={styles.member}
          onPress={() =>
            navigation.navigate('ViewMemberPredictions', {
              memberId: admin._id,
              memberName: admin.username,
            })
          }>
          <Text style={styles.text}>
            {admin?.username}{' '}
            {admin?._id == auth.userId ? '(you) (admin)' : '(admin)'}
          </Text>
        </TouchableOpacity>
        {members.map(member => {
          return (
            <TouchableOpacity
              style={styles.member}
              key={member._id}
              onPress={() =>
                navigation.navigate('ViewMemberPredictions', {
                  memberId: member._id,
                  memberName: member.username,
                })
              }>
              <Text style={styles.text}>
                {member?.username} {member?._id == auth.userId ? '(You)' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ViewMembersScreen;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  page: {
    backgroundColor: 'black',
    flex: 1,
  },
  page2: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  heading2: {
    fontSize: 22,
    color: 'white',
    fontWeight: '400',
  },
  member: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
