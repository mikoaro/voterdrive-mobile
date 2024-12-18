import React from 'react';
import { View, Text, Image } from 'react-native';

const FundItem = ({ amount, currency, iconSource }) => {
  return (
    <View className="bg-gray-100 rounded-xl p-4 mb-2 flex-row items-center">
      <Image 
        source={iconSource} 
        className="w-10 h-10"
      />
      <Text className="ml-4 text-lg font-bold">
        {amount} {currency}
      </Text>
    </View>
  );
};

export default FundItem;

