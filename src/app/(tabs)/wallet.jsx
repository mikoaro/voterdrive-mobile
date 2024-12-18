import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import BalanceCard from '@/components/BalanceCard';
import FundItem from '@/components/FundItem';

const Wallet = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 border-b border-gray-200">
        <Text className="text-2xl font-bold">Wallet</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Balance Section */}
        <View className="mt-6">
          <Text className="text-2xl font-bold mb-4">Your Balance</Text>
          <BalanceCard balance="0.00" currency="DCASH" />
        </View>

        {/* Funds Section */}
        <View className="mt-6">
          <Text className="text-2xl font-bold mb-4">Funds</Text>
          <FundItem 
            amount="0.50"
            currency="NACTION"
            iconSource={require('../../../assets/dcash-coin.png')}
          />
        </View>

        {/* Collectibles Section */}
        <View className="mt-6 mb-20">
          <Text className="text-2xl font-bold mb-4">Collectibles</Text>
          <View className="bg-gray-100 rounded-xl p-4">
            <Text className="text-gray-600">
              no collectible(s) found
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <BottomNavigation activeTab="Wallet" /> */}
    </SafeAreaView>
  );
};

export default Wallet;

