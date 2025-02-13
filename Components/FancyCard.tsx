import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
} from 'react-native';

const cardData = [
  {
    cardNo: '123456789012',
    name: 'Siddhi Kakpure',
    expiryDate: '12/24',
    cvv: '123',
  },
  {
    cardNo: '123456789013',
    name: 'Kalyani Doe',
    expiryDate: '06/25',
    cvv: '456',
  },
  {
    cardNo: '123456789014',
    name: 'Kunal Sarthoj',
    expiryDate: '06/25',
    cvv: '456',
  },
  {
    cardNo: '123456789015',
    name: 'Tushar Binoi',
    expiryDate: '06/25',
    cvv: '456',
  },
];

type Tab = 'Home' | 'Yolo Pay' | 'Ginie';
interface BottomNavigationProps {
  selectedTab: Tab;
  setSelectedTab: React.Dispatch<React.SetStateAction<Tab>>;
}

const FancyCard = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('Yolo Pay');
  const [selectedButton, setSelectedButton] = useState<string>('Pay');
  const [formData, setFormData] = useState({
    name: '',
    cardNo: '',
    bank: '',
  });
  const [selectedCardDetails, setSelectedCardDetails] = useState<any>(null);
  const [frozenEffect, setFrozenEffect] = useState(false);

  const handlePress = (buttonName: string) => {
    setSelectedButton(buttonName);
    if (buttonName === 'Card') {
      setFrozenEffect(true);
      const matchedCard = cardData.find(
        card => card.cardNo === formData.cardNo && card.name === formData.name,
      );
      if (matchedCard) {
        setSelectedCardDetails(matchedCard);
      }
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleFormSubmit = () => {
    const matchedCard = cardData.find(
      card => card.cardNo === formData.cardNo && card.name === formData.name,
    );
    if (matchedCard) {
      setSelectedCardDetails(matchedCard);
    } else {
      setSelectedCardDetails(null);
      Alert.alert('Error', 'Card details not found.');
    }

    setFormData({
      name: '',
      cardNo: '',
      bank: '',
    });
  };

  const toggleFrozenEffect = () => {
    setFrozenEffect(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Select Payment Mode</Text>
      <Text style={styles.subinfo}>
        Choose your preferred payment method to make payment.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handlePress('Pay')}
          style={[
            styles.button,
            selectedButton === 'Pay' && {
              backgroundColor: '#000',
              borderColor: 'red',
            },
          ]}>
          <Text
            style={[
              styles.buttonText,
              selectedButton === 'Pay' && {color: 'red'},
            ]}>
            Pay
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress('Card')}
          style={[
            styles.button,
            selectedButton === 'Card' && {
              backgroundColor: '#000',
              borderColor: 'red',
            },
          ]}>
          <Text
            style={[
              styles.buttonText,
              selectedButton === 'Card' && {color: 'red'},
            ]}>
            Card
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardHeading}>Your Digital Debit Card</Text>
      <View style={styles.contentContainer}>
        {selectedButton === 'Pay' ? (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#8d8d8d"
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              placeholderTextColor="#8d8d8d"
              value={formData.cardNo}
              onChangeText={text =>
                handleInputChange(
                  'cardNo',
                  text.replace(/[^0-9]/g, '').slice(0, 12),
                )
              }
              keyboardType="numeric"
              maxLength={12}
            />
            <TextInput
              style={styles.input}
              placeholder="Bank"
              placeholderTextColor="#8d8d8d"
              value={formData.bank}
              onChangeText={text => handleInputChange('bank', text)}
            />
            <TouchableOpacity
              onPress={handleFormSubmit}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cardInfoContainer}>
            {frozenEffect && (
              <Animated.View
                style={[styles.absolute, {opacity: frozenEffect ? 0.5 : 0}]}>
                <Text style={styles.cardInfoText}>Frozen</Text>
              </Animated.View>
            )}
            {selectedCardDetails && !frozenEffect ? (
              <>
                <Text style={styles.cardInfoText}>Card Information:</Text>
                <Text style={styles.cardInfoText}>
                  Card No: {selectedCardDetails.cardNo}
                </Text>
                <Text style={styles.cardInfoText}>
                  Name: {selectedCardDetails.name}
                </Text>
                <Text style={styles.cardInfoText}>
                  Expiry Date: {selectedCardDetails.expiryDate}
                </Text>
                <Text style={styles.cardInfoText}>
                  CVV: {selectedCardDetails.cvv}
                </Text>
              </>
            ) : (
              !frozenEffect &&
              !selectedCardDetails && (
                <Text style={styles.cardInfoText}>
                  No card details available.
                </Text>
              )
            )}
          </View>
        )}
        <TouchableOpacity
          style={styles.FrozenButton}
          onPress={toggleFrozenEffect}>
          <Text style={styles.buttonText}>Frozen</Text>
        </TouchableOpacity>
      </View>

      {/* bottom navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={[
            styles.navButton,
            selectedTab === 'Home' && styles.selectedNavButton,
          ]}
          onPress={() => setSelectedTab('Home')}>
          <Text
            style={[
              styles.navButtonText,
              selectedTab === 'Home' && {color: '#007BFF'},
            ]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            selectedTab === 'Yolo Pay' && styles.selectedNavButton,
          ]}
          onPress={() => setSelectedTab('Yolo Pay')}>
          <Text
            style={[
              styles.navButtonText,
              selectedTab === 'Yolo Pay' && {color: '#007BFF'},
            ]}>
            Yolo Pay
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            selectedTab === 'Ginie' && styles.selectedNavButton,
          ]}
          onPress={() => setSelectedTab('Ginie')}>
          <Text
            style={[
              styles.navButtonText,
              selectedTab === 'Ginie' && {color: '#007BFF'},
            ]}>
            Ginie
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  headingText: {
    marginVertical: 15,
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
  subinfo: {
    color: '#676767',
    lineHeight: 21,
    letterSpacing: -0.17,
    fontSize: 17,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: '#fff',
    borderBottomWidth: 0,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardHeading: {
    marginLeft: 5,
    marginTop: 40,
    fontSize: 16,
    color: '#454545',
  },
  contentContainer: {
    backgroundColor: '#000',
    flexDirection: 'row',
    marginTop: 15,
    position: 'relative', // Make sure the container can have absolutely positioned children
  },
  formContainer: {
    width: 186,
    height: 296,
    backgroundColor: '#000',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#676767',
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#000',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#676767',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 16,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
  },
  cardInfoContainer: {
    width: 186,
    height: 296,
    backgroundColor: '#000',
    padding: 20,
    marginLeft: 16,
    position: 'relative',
  },
  cardInfoText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    opacity: 1, // Ensure card details are visible by default
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
    borderRadius:20,
    backgroundColor: 'rgba(225, 225, 225, 0.5)', // Semi-transparent overlay
    alignItems: 'center',
    justifyContent: 'center',
  },
  FrozenButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 16,
    marginTop: 10,
    marginLeft:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: -190,
    left: 0,
    right: 0,
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  navButton: {
    alignItems: 'center',
  },
  selectedNavButton: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  navButtonText: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default FancyCard;
