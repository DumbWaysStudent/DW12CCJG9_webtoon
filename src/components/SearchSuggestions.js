import React from 'react';
import { View, Text } from 'react-native';

const SearchSuggestions = (props) => {
    const options = props.results.map(r => (
        <Text key={r.id}>
            {r.title}
        </Text>
    ))
    return <View>{options}</View>
}

export default SearchSuggestions