import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import { COLORS, fontFamily } from '../../constants';
import { useTheme } from '../context/ThemeContext';
import InputField from './InputField';

export default function SendApologyModal({ visible, onClose, onSend }) {
  const [step, setStep] = useState(1);
  const [recipientName, setRecipientName] = useState('');
  const [contactType, setContactType] = useState('app');
  const [contactValue, setContactValue] = useState('');
  const [reason, setReason] = useState('');
  const [guiltLevel, setGuiltLevel] = useState(0);
  const [promise, setPromise] = useState('');
  const [gift, setGift] = useState('');
  const { colors } = useTheme();

  const GUILT_LEVELS = [
    { value: 1, emoji: '😔', label: 'A Little Sorry' },
    { value: 2, emoji: '😥', label: 'Pretty Sorry' },
    { value: 3, emoji: '😢', label: 'Very Sorry' },
    { value: 4, emoji: '😭', label: 'Extremely Sorry' },
    { value: 5, emoji: '🙏', label: 'Deeply Regretful' },
  ];

  const GIFT_SUGGESTIONS = [
    'A heartfelt letter', 'Their favorite flowers', 'A thoughtful gift card',
    'A home-cooked meal', 'Quality time together', 'A personalized photo album', 'Their favorite treat',
  ];

  const resetForm = () => {
    setStep(1);
    setRecipientName('');
    setContactType('app');
    setContactValue('');
    setReason('');
    setGuiltLevel(0);
    setPromise('');
    setGift('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleNext = () => step < 5 ? setStep(step + 1) : handleSubmit();
  const handleBack = () => step > 1 && setStep(step - 1);

  const handleSubmit = () => {
    onSend({
      recipient: {
        name: recipientName,
        contact: contactValue,
        type: contactType,
      },
      reason,
      guiltLevel,
      promise,
      gift,
    });
    handleClose();
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return recipientName.trim() && (contactType === 'app' || contactValue.trim());
      case 2:
        return reason.trim().length >= 10;
      case 3:
        return guiltLevel > 0;
      case 4:
        return promise.trim().length >= 10;
      case 5:
        return gift.trim();
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Animated.View entering={FadeInDown.delay(200)} style={styles.stepContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Who are you apologizing to?</Text>
            <InputField
              placeholder="Recipient's name"
              value={recipientName}
              onChangeText={setRecipientName}
            />

            <View style={styles.row}>
              {['app', 'email', 'phone'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    { backgroundColor: contactType === type ? COLORS.BlazeOrange : colors.surface }
                  ]}
                  onPress={() => setContactType(type)}
                >
                  <Icon
                    name={type === 'app' ? 'user' : type}
                    size={18}
                    color={contactType === type ? colors.text : colors.textSecondary}
                  />
                  <Text style={[styles.text, { color: contactType === type ? colors.text : colors.textSecondary }]}>
                    {type === 'app' ? 'App' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {contactType !== 'app' && (
              <InputField
                placeholder={contactType === 'email' ? 'Email' : 'Phone'}
                value={contactValue}
                // keyboardType={contactType === 'email' ? 'email-address' : 'phone-pad'}
                onChangeText={setContactValue}
                multiline={true}
                numberOfLines={6}
              />
            )}
          </Animated.View>
        );
      case 2:
        return (
          <Animated.View entering={FadeInDown.delay(200)} style={styles.stepContainer}>
            <Text style={[styles.title, { color: colors.text }]}>What are you apologizing for?</Text>
            <InputField
              placeholder="Describe what happened and why you're sorry..."
              value={reason}
              onChangeText={setReason}
              multiline={true}
              numberOfLines={6}
            />
          </Animated.View>
        );
      case 3:
        return (
          <Animated.View entering={FadeInDown.delay(200)} style={styles.stepContainer}>
            <Text style={[styles.title, { color: colors.text }]}>How sorry are you?</Text>
            {GUILT_LEVELS.map(({ value, emoji, label }) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.guiltButton,

                  { backgroundColor: guiltLevel === value ? colors.primary : colors.surface }
                ]}
                onPress={() => setGuiltLevel(value)}
              >
                <Text style={styles.emoji}>{emoji}</Text>
                <Text style={[styles.text, { color: guiltLevel === value ? colors.text : colors.textSecondary }]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        );
      case 4:
        return (
          <Animated.View entering={FadeInDown.delay(200)} style={styles.stepContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Make a promise</Text>
            <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
              What will you do to ensure this doesn't happen again?
            </Text>
            <InputField
              placeholder="I promise to..."
              value={promise}
              onChangeText={setPromise}
              multiline={true}
              numberOfLines={6}
            />
          </Animated.View>
        );
      case 5:
        return (
          <Animated.View entering={FadeInDown.delay(200)} style={styles.stepContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Add a thoughtful gesture</Text>
            <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
              What will you do or give to show your sincerity?
            </Text>
            <InputField
              placeholder="Describe your gesture..."
              value={gift}
              onChangeText={setGift}
              multiline={true}
              numberOfLines={6}
            />
            <Text style={[styles.suggestionsTitle, { color: colors.text }]}>
              Suggestions:
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {GIFT_SUGGESTIONS.map((suggestion, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.suggestionButton, { backgroundColor: colors.surface }]}
                  onPress={() => setGift(suggestion)}
                >
                  <Icon name="gift" size={16} color={COLORS.BlazeOrange} />
                  <Text style={[styles.text, { color: colors.text, marginLeft: wp('2%') }]}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <LinearGradient
            colors={[colors.primary, `${colors.primary}00`]}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose}>
              <Icon name="x" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Send Apology</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.progressBar}>
            {[1, 2, 3, 4, 5].map((s) => (
              <View
                key={s}
                style={[
                  styles.progressStep,
                  {
                    backgroundColor: s <= step ? colors.primary : colors.surface,
                    width: `${100 / 5}%`,
                  }
                ]}
              />
            ))}
          </View>

          <ScrollView contentContainerStyle={{ padding: wp('5%') }}>
            {renderStep()}
          </ScrollView>
          <View style={styles.footer}>
            {step > 1 && (
              <TouchableOpacity onPress={handleBack} style={[styles.backButton, { backgroundColor: colors.surface }]}>
                <Icon name="arrow-left" size={20} color={colors.text} />
                <Text style={[styles.backButtonText, { color: colors.text }]}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.nextButton,
                {
                  backgroundColor: isStepValid() ? colors.primary : colors.surfaceAccent,
                  opacity: isStepValid() ? 1 : 0.5,
                }
              ]}
              onPress={handleNext}
              disabled={!isStepValid()}
            >
              {step === 5 ? (
                <>
                  <Icon name={'send'} size={20} color={colors.text} />
                  <Text style={[styles.nextButtonText, { color: colors.text }]}>
                    Send Apology
                  </Text>
                </>
              ) : (
                <>
                  <Text style={[styles.nextButtonText, { color: colors.text }]}>
                    Next
                  </Text>
                  <Icon name={'arrow-right'} size={20} color={colors.text} />
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal >
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    height: hp(80),
    paddingBottom: hp(2),
    overflow: 'hidden',

  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: hp(25),
    opacity: 0.15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
  },
  headerTitle: {
    fontSize: hp(2.5),
    fontFamily: fontFamily.FONTS.bold,
  },
  progressBar: {
    flexDirection: 'row',
    height: hp(0.5),
    marginBottom: hp(1),
  },
  progressStep: {
    height: '100%',
  },
  title: {
    fontSize: hp(2.3),
    fontFamily: fontFamily.FONTS.bold,
    marginBottom: hp(1),
  },
  stepDescription: {
    fontSize: hp(1.7),
    fontFamily: fontFamily.FONTS.Medium,
    marginBottom: hp(1),
  },
  input: {
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    height: hp('6%'),
    marginBottom: hp('2%'),
  },
  textArea: {
    borderRadius: wp('3%'),
    padding: wp('4%'),
    minHeight: hp('15%'),
    textAlignVertical: 'top',
  },
  text: {
    fontFamily: fontFamily.FONTS.bold,
    fontSize: hp(1.5)
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  typeButton: {
    flex: 1,
    padding: wp('3%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: wp('1%'),
    gap: wp('1.5%'),
  },
  guiltButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4%'),
    borderRadius: wp('4%'),
    marginVertical: hp('1%'),
    gap: wp('3%'),
  },
  emoji: {
    fontSize: wp('6%'),
  },
  suggestionsTitle: {
    fontFamily: fontFamily.FONTS.bold,
    fontSize: hp(1.7),
    marginTop: hp(1.5),
  },
  suggestionButton: {
    marginTop: hp(1.5),
    padding: wp('3%'),
    borderRadius: wp('5%'),
    marginRight: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    padding: wp('5%'),
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4%'),
    borderRadius: wp('6%'),
  },
  backButtonText: {
    fontSize: hp(2),
    fontFamily: fontFamily.FONTS.Medium
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    borderRadius: wp('6%'),
  },
  stepContainer: {
    paddingBottom: hp('5%'),
  },
  nextButtonText: {
    fontSize: hp(1.8),
    fontFamily: fontFamily.FONTS.Medium,
  },
});
