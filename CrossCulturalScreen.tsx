import React, { useMemo, useRef, useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, SafeAreaView, Alert } from 'react-native';

// Import your JSON or fetch from backend
import tips from '../shared/tips.json';
import quiz from '../shared/quiz.json';

export default function CrossCulturalScreen() {
  const [index, setIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [responses, setResponses] = useState<number[]>(Array(quiz.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const correct = useMemo(
    () => responses.reduce((a, r, i) => a + (r === (quiz as any)[i].answer ? 1 : 0), 0),
    [responses]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ padding: 16 }}>
        <View style={{ backgroundColor: '#4f46e5', borderRadius: 20, padding: 16 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>Work With The World</Text>
          <Text style={{ color: 'white', opacity: 0.9, marginTop: 4 }}>
            Master cross‑cultural client communication.
          </Text>
        </View>

        <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 16, marginTop: 16 }}>
          <Text style={{ fontSize: 40 }}>{(tips as any)[index].icon}</Text>
          <Text style={{ fontSize: 18, fontWeight: '800', marginTop: 8 }}>{(tips as any)[index].title}</Text>
          <Text style={{ color: '#475569', marginTop: 6 }}>{(tips as any)[index].oneLiner}</Text>
          <Text style={{ color: '#334155', marginTop: 6 }}>{(tips as any)[index].detail}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
            <Pressable
              onPress={() => setIndex(i => Math.max(0, i - 1))}
              style={{ padding: 10, borderRadius: 12, backgroundColor: '#e2e8f0' }}>
              <Text>← Back</Text>
            </Pressable>
            {index < (tips as any).length - 1 ? (
              <Pressable
                onPress={() => setIndex(i => Math.min((tips as any).length - 1, i + 1))}
                style={{ padding: 10, borderRadius: 12, backgroundColor: '#4f46e5' }}>
                <Text style={{ color: 'white' }}>Next →</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => setShowQuiz(true)} style={{ padding: 10, borderRadius: 12, backgroundColor: '#16a34a' }}>
                <Text style={{ color: 'white' }}>Take Quiz ✅</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <Modal visible={showQuiz} animationType="slide">
        <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '800' }}>Quick Check</Text>
            <Pressable onPress={() => setShowQuiz(false)} style={{ padding: 8, backgroundColor: '#e2e8f0', borderRadius: 10 }}>
              <Text>✕</Text>
            </Pressable>
          </View>

          <FlatList
            style={{ marginTop: 12 }}
            data={(quiz as any)}
            keyExtractor={(_, i) => String(i)}
            renderItem={({ item, index: qi }) => (
              <View style={{ borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 16, padding: 12, marginBottom: 12 }}>
                <Text style={{ fontWeight: '600' }}>{qi + 1}. {item.q}</Text>
                <View style={{ marginTop: 8 }}>
                  {item.options.map((opt: string, oi: number) => (
                    <Pressable
                      key={oi}
                      onPress={() => !submitted && setResponses(r => { const n = [...r]; n[qi] = oi; return n; })}
                      style={{ padding: 10, borderRadius: 12, backgroundColor: responses[qi] === oi ? '#e0e7ff' : '#f1f5f9', marginBottom: 8 }}>
                      <Text>{opt}</Text>
                    </Pressable>
                  ))}
                </View>
                {submitted && responses[qi] !== -1 && (
                  <Text style={{ marginTop: 6 }}>
                    {responses[qi] === item.answer ? 'Correct. ' : 'Not quite. '}{item.explain}
                  </Text>
                )}
              </View>
            )}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {!submitted ? (
              <Pressable onPress={() => setSubmitted(true)} style={{ padding: 12, borderRadius: 12, backgroundColor: '#4f46e5' }}>
                <Text style={{ color: 'white' }}>Submit Answers</Text>
              </Pressable>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ padding: 8, backgroundColor: '#fde68a', borderRadius: 10, marginRight: 8 }}>
                  Score: {Math.round((correct / (quiz as any).length) * 100)}% ({correct}/{(quiz as any).length})
                </Text>
                {Math.round((correct / (quiz as any).length) * 100) >= 80 && (
                  <Text style={{ padding: 8, backgroundColor: '#d9f99d', borderRadius: 10 }}>Badge: Global Communicator 🏅</Text>
                )}
              </View>
            )}

            <Pressable onPress={() => { if (submitted) { setResponses(Array((quiz as any).length).fill(-1)); setSubmitted(false);} setShowQuiz(false); }}
                      style={{ padding: 12, borderRadius: 12, backgroundColor: '#e2e8f0' }}>
              <Text>{submitted ? 'Close & Reset' : 'Close'}</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
