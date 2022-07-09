/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input';
import {useSelector} from 'react-redux';

import Events from '../../components/match/Events';
import {
  getMatchEvents,
  getMatchPrediction,
  makeMatchPrediction,
  editMatchPrediction,
} from '../../functions/matches';
//disable the input buttons as well if the match has started
//disable button feature is not yet in react-native-numeric-input
const OverviewScreen = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const route = useRoute();
  const {id, team1, team2, status, matchDate} = route.params;
  const [events, setEvents] = useState([]);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [predictionButtonTitle, setPredictionButtonTitle] =
    useState('Make Prediction');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = () => {
    setIsLoading(true);
    getMatchEvents(id)
      .then(async res => {
        await setEvents(res.data.response);
        // setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const getPrediction = () => {
    getMatchPrediction(id, auth.userId)
      .then(res => {
        setScore1(res.data.team1.predictedGoals);
        setScore2(res.data.team2.predictedGoals);
        setPredictionButtonTitle('Edit Prediction');
        setIsLoading(false);
      })
      .catch(err => {
        if (err.response.data.error == 'Prediction not found') {
          setPredictionButtonTitle('Make Prediction');
        }
        setIsLoading(false);
      });
  };

  const predictionHandler = () => {
    setButtonLoading(true);
    if (predictionButtonTitle == 'Make Prediction') {
      let predictionteam1 = {
        name: team1.name,
        predictedGoals: score1,
      };
      let predictionteam2 = {
        name: team2.name,
        predictedGoals: score2,
      };
      makeMatchPrediction(
        auth.userId,
        id,
        predictionteam1,
        predictionteam2,
        matchDate,
      )
        .then(res => {
          setScore1(res.data.team1.predictedGoals);
          setScore2(res.data.team2.predictedGoals);
          setPredictionButtonTitle('Edit Prediction');
          setButtonLoading(false);
        })
        .catch(err => {
          console.log(err);
          setButtonLoading(false);
        });
    } else {
      let predictionteam1 = {
        name: team1.name,
        predictedGoals: score1,
      };
      let predictionteam2 = {
        name: team2.name,
        predictedGoals: score2,
      };
      editMatchPrediction(
        auth.userId,
        id,
        predictionteam1,
        predictionteam2,
        matchDate,
      )
        .then(res => {
          setScore1(res.data.team1.predictedGoals);
          setScore2(res.data.team2.predictedGoals);
          // setPredictionButtonTitle('Edit Prediction');
          setButtonLoading(false);
        })
        .catch(err => {
          console.log(err);
          setButtonLoading(false);
        });
    }
  };

  useEffect(() => {
    getEvents();
    getPrediction();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.page}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (
    status !== '1H' &&
    status !== 'HT' &&
    status !== '2H' &&
    status !== 'ET' &&
    status !== 'P' &&
    status !== 'FT' &&
    status !== 'AET' &&
    status !== 'PEN' &&
    status !== 'BT ' &&
    status !== 'INT' &&
    status !== 'LIVE'
  ) {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={styles.team1}>
              <Text style={styles.text}>{team1.name}</Text>
              <NumericInput
                totalWidth={120}
                totalHeight={50}
                minValue={0}
                maxValue={20}
                rounded={true}
                textColor="white"
                iconStyle={{color: 'black'}}
                value={score1}
                onChange={value => setScore1(value)}
              />
            </View>
            <View style={styles.team2}>
              <Text style={styles.text}>{team2.name}</Text>
              <NumericInput
                totalWidth={120}
                totalHeight={50}
                minValue={0}
                maxValue={20}
                rounded={true}
                textColor="white"
                iconStyle={{color: 'black'}}
                value={score2}
                onChange={value => setScore2(value)}
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={styles.buttonContainer}>
              <Button
                title={predictionButtonTitle}
                onPress={predictionHandler}
                buttonStyle={styles.button}
                titleStyle={{color: 'black'}}
                loading={buttonLoading}
                loadingProps={{size: 'small', color: 'black'}}
              />
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.heading}>Match events not available</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={styles.team1}>
              <Text style={styles.text}>{team1.name}</Text>
              <NumericInput
                totalWidth={120}
                totalHeight={50}
                minValue={0}
                maxValue={20}
                rounded={true}
                textColor="white"
                iconStyle={{color: 'black'}}
                value={score1}
                hideButton={true}
                editable={false}
                disabled={true}
                onChange={() => {}}
              />
            </View>
            <View style={styles.team2}>
              <Text style={styles.text}>{team2.name}</Text>
              <NumericInput
                totalWidth={120}
                totalHeight={50}
                minValue={0}
                maxValue={20}
                rounded={true}
                textColor="white"
                iconStyle={{color: 'black'}}
                value={score2}
                hideButton={true}
                editable={false}
                disabled={true}
                onChange={() => {}}
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={styles.buttonContainer}>
              <Button
                title={predictionButtonTitle}
                onPress={predictionHandler}
                buttonStyle={styles.button}
                titleStyle={{color: 'black'}}
                disabled
              />
            </View>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={styles.heading}>MATCH EVENTS</Text>
        </View>
        {events.length > 0 && (
          <Events events={events} team1={team1} team2={team2} />
        )}
      </ScrollView>
    </View>
  );
};

export default OverviewScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'black',
    flex: 1,
  },
  page2: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    backgroundColor: '#3e3c42',
    borderTopWidth: 0.5,
    borderBottomWidth: 1,
    borderColor: 'white',
    width: '100%',
    marginBottom: 10,
  },
  team1: {
    alignItems: 'center',
    // marginBottom: 10,
  },
  team2: {
    alignItems: 'center',
    // marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  inputContainer: {
    width: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    minWidth: 80,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 15,
  },
});
