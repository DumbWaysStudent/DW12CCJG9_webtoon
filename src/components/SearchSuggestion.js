import React from 'react';
import { Text, View } from 'react-native';

const SearchSuggestion = (props) => {
    const options = props.results.map(r => (
        <Text key={r.id}>
            {r.title}
        </Text>
    ))
    return <View>{options}</View>
}

export default SearchSuggestion;