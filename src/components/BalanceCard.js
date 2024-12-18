import React from 'react';
import { View, Text, Image } from 'react-native';

const BalanceCard = ({ balance = "0.00", currency = "DEEDZ" }) => {
  return (
    <View className="bg-gray-200 rounded-xl p-6 mb-6 relative overflow-hidden">
      <View className="flex-row items-center mb-4">
        <Image 
          source={require('../../assets/dcash-coin.png')} 
          className="w-16 h-16"
        />
        <View className="ml-4">
          <Text className="text-3xl font-bold">
            {balance} {currency}
          </Text>
        </View>
      </View>
      <View className="mt-4">
        <Text className="text-center text-gray-600 text-sm">Account #:</Text>
        <Text className="text-center text-gray-800 font-mono text-xs mt-1">
          0xa9Bf25EF1efb3373cE65df2AA238e771aAd20e7F
        </Text>
      </View>
      {/* Watermark */}
      <Image 
        source={require('../../assets/dcash-coin.png')} 
        className="absolute right-0 top-0 w-32 h-32 opacity-10"
      />
    </View>
  );
};

export default BalanceCard;

