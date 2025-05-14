import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from './Pixel/Index';
import { COLORS, fontFamily } from '../../constants';
import Button from './Button';
import { useTheme } from '../context/ThemeContext';


const RECEIVED_APOLOGIES = [
  {
    id: 1,
    from: 'Michael',
    reason: "I'm sorry for missing our lunch plans yesterday. Work got hectic and I completely lost track of time.",
    guiltLevel: 4,
    promise: "I promise to set better boundaries with work and always notify you well in advance if something comes up.",
    gift: "Your favorite restaurant - lunch is on me next time!",
    timestamp: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    from: 'Sarah',
    reason: "I apologize for the harsh words during our discussion. I let my emotions get the better of me.",
    guiltLevel: 5,
    promise: "I will work on managing my emotions better and communicate more respectfully.",
    gift: "A spa day for both of us to relax and reconnect",
    timestamp: "1 day ago",
    status: "accepted",
  },
];

const GUILT_EMOJIS = ['😔', '😥', '😢', '😭', '🙏'];

export default function ApologyInboxModal({ visible, onClose, onAccept }) {
  const { colors } = useTheme();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
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
              <Icon name="x" size={hp(3)} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Received Apologies</Text>
            <View style={{ width: hp(3) }} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {RECEIVED_APOLOGIES.map((apology, index) => (
              <Animated.View
                key={apology.id}
                entering={FadeInDown.delay(index * 100)}
                style={[styles.apologyCard, { backgroundColor: colors.surface }]}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.fromContainer}>
                    <FontAwesome name="heart" size={hp(2.2)} color={COLORS.BlazeOrange} />
                    <Text style={[styles.fromText, { color: colors.text }]}>From {apology.from}</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <MaterialIcons name="access-time" size={hp(2)} color={colors.textSecondary} />
                    <Text style={[styles.timeText, { color: colors.textSecondary }]}>{apology.timestamp}</Text>
                  </View>
                </View>

                <View style={styles.guiltLevel}>
                  <Text style={styles.guiltEmoji}>{GUILT_EMOJIS[apology.guiltLevel - 1]}</Text>
                </View>

                <Text style={[styles.reasonText, { color: colors.text }]}>{apology.reason}</Text>

                <View style={[styles.section, { backgroundColor: `${colors.primary}22` }]}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Their Promise</Text>
                  <Text style={[styles.sectionText, { color: colors.textSecondary }]}>{apology.promise}</Text>
                </View>

                <View style={[styles.giftSection, { backgroundColor: `${colors.primary}22` }]}>
                  <FontAwesome name="gift" size={hp(2.2)} color={COLORS.BlazeOrange} />
                  <Text style={[styles.giftText, { color: colors.text }]}>{apology.gift}</Text>
                </View>

                {apology.status === 'pending' && (
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => onAccept(apology.id)}
                      activeOpacity={0.5}
                    >
                      <LinearGradient
                        colors={[COLORS.BlazeOrange, COLORS.black]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                      >

                        <Text style={styles.buttonText}><Icon name="check" size={hp(2.2)} color={colors.text} />  Accept Apology</Text>

                      </LinearGradient>
                    </TouchableOpacity>
                    {/* <Button
                      title="Accept Apology"
                      onPress={() => onAccept(apology.id)}
                      icon={<Icon name="check" size={hp(2.2)} color={colors.text} />}
                      containerStyle={styles.acceptButton}
                    /> */}
                  </View>
                )}

                {apology.status === 'accepted' && (
                  <View style={styles.acceptedBadge}>
                    <Icon name="check" size={hp(2)} color={COLORS.BlazeOrange} />
                    <Text style={[styles.acceptedText, { color: colors.text }]}>Accepted</Text>
                  </View>
                )}
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: '90%',
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
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
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? hp(6) : hp(4),
    paddingBottom: hp(2),
  },
  headerTitle: {
    fontSize: hp(2.5),
    fontFamily: fontFamily.FONTS.bold,
  },
  content: {
    flex: 1,
    padding: wp(5),
  },
  apologyCard: {
    borderRadius: wp(4),
    padding: wp(5),
    marginBottom: hp(2),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  fromContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  fromText: {
    fontSize: hp(2),
    fontFamily: fontFamily.FONTS.bold
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  timeText: {
    fontSize: hp(1.6),
  },
  guiltLevel: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  guiltEmoji: {
    fontSize: hp(6),
  },
  reasonText: {
    fontSize: hp(2),
    fontFamily: fontFamily.FONTS.bold,
    lineHeight: hp(3),
    marginBottom: hp(2),
  },
  section: {
    padding: wp(4),
    borderRadius: wp(4),
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2),
    fontFamily: fontFamily.FONTS.bold,
    marginBottom: hp(1),
  },
  sectionText: {
    fontSize: hp(1.7),
    fontFamily: fontFamily.FONTS.bold
  },
  giftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    padding: wp(4),
    borderRadius: wp(4),
    marginBottom: hp(2),
  },
  giftText: {
    fontSize: hp(1.8),
    fontFamily: fontFamily.FONTS.Medium,
    flex: 1,
  },
  actions: {
    marginTop: hp(1),
  },
  acceptButton: {
    width: '100%',
  },
  acceptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: wp(3),
    alignSelf: 'flex-start',
    marginTop: hp(1),
  },
  acceptedText: {
    fontSize: hp(1.7),
    fontFamily: fontFamily.FONTS.Medium,
  },
  button: {
    height: hp(6),
    width: wp(80),
    borderRadius: wp(10),
    marginHorizontal: wp(0),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  buttonText: {
    fontSize: hp(1.9),
    color: COLORS.white,
    fontFamily: fontFamily.FONTS.Medium,
  },
});
