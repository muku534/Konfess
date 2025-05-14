import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import { COLORS, fontFamily } from '../../constants';
import { useTheme } from '../context/ThemeContext';


const COSMIC_INSIGHTS = [
  {
    title: "Mercury's Influence",
    description: "Mercury's position suggests enhanced communication abilities. Your words will carry extra weight and sincerity today.",
    icon: 'star',
  },
  {
    title: "Lunar Energy",
    description: "The moon's phase amplifies emotional intelligence. This is an ideal time for heartfelt conversations and making amends.",
    icon: 'moon',
  },
  {
    title: "Solar Alignment",
    description: "The sun's position brings clarity and warmth to your interactions. Your genuine intentions will shine through.",
    icon: 'sun',
  },
];

const HEALING_CRYSTALS = [
  {
    name: 'Rose Quartz',
    property: 'Opens the heart chakra and promotes emotional healing',
    color: '#FFB5C5',
  },
  {
    name: 'Amethyst',
    property: 'Enhances spiritual wisdom and emotional balance',
    color: '#9966CC',
  },
  {
    name: 'Blue Lace Agate',
    property: 'Facilitates peaceful communication',
    color: '#B0E0E6',
  },
];

const NUMEROLOGY_TIP = {
  number: '8',
  meaning:
    "Today's numerological vibration of 8 represents karma and balance, making it an auspicious time for making amends.",
};

export default function ApologyHoroscopeModal({ visible, onClose, horoscope }) {
  const { colors } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <LinearGradient
            colors={[colors.primary, `${colors.primary}00`]}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="x" size={wp(6)} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Cosmic Guidance</Text>
            <View style={{ width: wp(6) }} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Animated.View entering={FadeInDown.delay(200)} style={[styles.section, { backgroundColor: colors.surface }]}>
              <View style={styles.horoscopeHeader}>
                <Icon name="star" size={wp(7)} color={COLORS.BlazeOrange} />
                <Text style={[styles.signText, { color: colors.text }]}>{horoscope.sign}</Text>
              </View>
              <Text style={[styles.dateText, { color: colors.textSecondary }]}>{horoscope.date}</Text>
              <Text style={[styles.predictionText, { color: colors.textSecondary }]}>{horoscope.prediction}</Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300)} style={[styles.section, { backgroundColor: colors.surface }]}>
              <View style={styles.sectionHeader}>
                <Icon name="sparkles" size={wp(5)} color={COLORS.BlazeOrange} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Cosmic Insights</Text>
              </View>
              {COSMIC_INSIGHTS.map((insight, index) => (
                <View
                  key={index}
                  style={[styles.insightCard, { backgroundColor: `${COLORS.BlazeOrange}11` }]}
                >
                  <Icon name={insight.icon} size={wp(5)} color={COLORS.BlazeOrange} />
                  <View style={styles.insightContent}>
                    <Text style={[styles.insightTitle, { color: colors.text }]}>{insight.title}</Text>
                    <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>{insight.description}</Text>
                  </View>
                </View>
              ))}
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(400)} style={[styles.section, { backgroundColor: colors.surface }]}>
              <View style={styles.sectionHeader}>
                <Icon name="compass" size={wp(5)} color={COLORS.BlazeOrange} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Healing Crystals</Text>
              </View>
              <View style={styles.crystalsGrid}>
                {HEALING_CRYSTALS.map((crystal, index) => (
                  <View
                    key={index}
                    style={[styles.crystalCard, { backgroundColor: `${crystal.color}22` }]}
                  >
                    <View style={[styles.crystalIcon, { backgroundColor: crystal.color }]} />
                    <Text style={[styles.crystalName, { color: colors.text }]}>{crystal.name}</Text>
                    <Text style={[styles.crystalProperty, { color: colors.textSecondary }]}>{crystal.property}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(500)} style={[styles.section, { backgroundColor: colors.surface }]}>
              <View style={styles.numerologyCard}>
                <Text style={[styles.numerologyNumber, { color: colors.text }]}>{NUMEROLOGY_TIP.number}</Text>
                <Text style={[styles.numerologyText, { color: colors.textSecondary }]}>{NUMEROLOGY_TIP.meaning}</Text>
              </View>
            </Animated.View>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
  content: {
    flex: 1,
    padding: wp(5),
  },
  section: {
    padding: wp(5),
    borderRadius: wp(4),
    marginBottom: hp(2),
  },
  horoscopeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    marginBottom: hp(1),
  },
  signText: {
    fontSize: wp(8),
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: wp(4),
    marginBottom: hp(2),
  },
  predictionText: {
    fontSize: wp(4.5),
    lineHeight: hp(3.5),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: '600',
  },
  insightCard: {
    flexDirection: 'row',
    padding: wp(4),
    borderRadius: wp(3),
    marginBottom: hp(1.5),
    gap: wp(3),
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: wp(4),
    fontWeight: '600',
    marginBottom: hp(0.5),
  },
  insightDescription: {
    fontSize: wp(3.5),
    lineHeight: hp(2.5),
  },
  crystalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(3),
  },
  crystalCard: {
    flex: 1,
    minWidth: '45%',
    padding: wp(4),
    borderRadius: wp(3),
    alignItems: 'center',
  },
  crystalIcon: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginBottom: hp(1.5),
  },
  crystalName: {
    fontSize: wp(4),
    fontWeight: '600',
    marginBottom: hp(0.5),
    textAlign: 'center',
  },
  crystalProperty: {
    fontSize: wp(3.5),
    textAlign: 'center',
    lineHeight: hp(2.5),
  },
  numerologyCard: {
    alignItems: 'center',
    gap: hp(1),
  },
  numerologyNumber: {
    fontSize: wp(12),
    fontWeight: 'bold',
  },
  numerologyText: {
    fontSize: wp(4),
    textAlign: 'center',
    lineHeight: hp(3),
  },
});
