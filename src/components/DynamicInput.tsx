import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  Modal,
} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native'; // ✅ modern icon source

export interface SmartInputProps {
  label: string;
  placeholder?: string;
  type: 'text' | 'textarea' | 'date';
  value: string;
  onChange: (value: string) => void;
  style?: object;
}

const DynamicInput: React.FC<SmartInputProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  style,
}) => {
  const [iosPickerVisible, setIosPickerVisible] = useState(false);

  // Parse & format date
  const parsedDate = useMemo(() => {
    const d = new Date(value);
    return isNaN(d.getTime()) ? new Date() : d;
  }, [value]);

  const formatDate = (d: Date) =>
    d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const openDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: parsedDate,
        mode: 'date',
        is24Hour: false,
        onChange: (_, selected) => {
          if (selected) onChange(formatDate(selected));
        },
      });
    } else {
      setIosPickerVisible(true);
    }
  };

  const onIOSChange = (_: any, selected?: Date) => {
    if (selected) onChange(formatDate(selected));
  };

  const isTextArea = type === 'textarea';
  const isDate = type === 'date';

  return (
    <View style={style}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {!isDate ? (
        // Text or Textarea Input
        <View
          style={[
            styles.fieldBox,
            isTextArea ? styles.textareaBox : styles.textBox,
          ]}
        >
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            style={[
              styles.input,
              isTextArea ? styles.multiline : styles.singleline,
            ]}
            multiline={isTextArea}
            numberOfLines={isTextArea ? 4 : 1}
            textAlignVertical={isTextArea ? 'top' : 'center'}
            value={value}
            onChangeText={onChange}
          />
        </View>
      ) : (
        <>
          {/* Date Field */}
          <Pressable
            onPress={openDatePicker}
            style={({ pressed }) => [
              styles.fieldBox,
              styles.dateField,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.dateText,
                value ? styles.dateValue : styles.placeholder,
              ]}
            >
              {value || placeholder || 'Select a date'}
            </Text>
            <View style={styles.iconWrapper}>
              <Calendar size={20} color="#9CA3AF" strokeWidth={2} />{' '}
              {/* ✅ Lucide icon */}
            </View>
          </Pressable>

          {/* iOS Date Picker Modal */}
          {Platform.OS === 'ios' && (
            <Modal
              transparent
              visible={iosPickerVisible}
              animationType="slide"
              onRequestClose={() => setIosPickerVisible(false)}
            >
              <View style={styles.modalBackdrop}>
                <View style={styles.modalSheet}>
                  <View style={styles.modalHeader}>
                    <Pressable onPress={() => setIosPickerVisible(false)}>
                      <Text style={styles.modalCancel}>Cancel</Text>
                    </Pressable>
                    <Pressable onPress={() => setIosPickerVisible(false)}>
                      <Text style={styles.modalDone}>Done</Text>
                    </Pressable>
                  </View>
                  <DateTimePicker
                    value={parsedDate}
                    mode="date"
                    display="spinner"
                    onChange={onIOSChange}
                  />
                </View>
              </View>
            </Modal>
          )}
        </>
      )}
    </View>
  );
};

export default DynamicInput;

const RADIUS = 12;

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },
  fieldBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS,
    paddingHorizontal: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  textBox: {
    height: 48,
    justifyContent: 'center',
  },
  textareaBox: {
    minHeight: 110,
    paddingVertical: 12,
  },
  input: {
    fontSize: 16,
    color: '#0F172A',
  },
  singleline: {
    height: 44,
  },
  multiline: {
    flexGrow: 1,
  },
  placeholder: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  dateValue: {
    color: '#0F172A',
    fontWeight: '600',
  },
  dateText: {
    fontSize: 16,
  },
  dateField: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 40,
    height: 48,
  },
  iconWrapper: {
    position: 'absolute',
    right: 12,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  modalCancel: {
    color: '#6B7280',
    fontSize: 16,
  },
  modalDone: {
    color: '#0369A1',
    fontSize: 16,
    fontWeight: '700',
  },
});
