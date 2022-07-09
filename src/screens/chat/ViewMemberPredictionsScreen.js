/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getUserPredictions} from '../../functions/chats';
import {FlatList} from 'react-native';
import Prediction from '../../components/match/Prediction';

const ViewMemberPredictionsScreen = ({navigation, route}) => {
  const {memberId, memberName} = route.params;
  const auth = useSelector(state => state.auth);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPredictions = () => {
    setIsLoading(true);
    getUserPredictions(memberId)
      .then(res => {
        setPredictions(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPredictions();
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
      <View style={{alignItems: 'center'}}>
        <Text style={styles.heading}>
          {memberId == auth.userId ? 'your' : memberName} predictions
        </Text>
      </View>
      {predictions.length != 0 && (
        <FlatList
          data={predictions}
          keyExtractor={item => item._id}
          renderItem={itemData => {
            return (
              <Prediction prediction={itemData.item} showUserName={false} />
            );
          }}
        />
      )}
    </View>
  );
};

export default ViewMemberPredictionsScreen;

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
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 10,
  },
  page2: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
