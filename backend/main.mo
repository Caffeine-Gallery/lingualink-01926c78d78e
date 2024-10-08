import Func "mo:base/Func";

import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

actor {
  // Define a type for translation records
  type TranslationRecord = {
    original: Text;
    translated: Text;
    targetLanguage: Text;
  };

  // Create a stable variable to store translation history
  stable var translationHistory : [TranslationRecord] = [];

  // Function to add a new translation record
  public func addTranslation(original: Text, translated: Text, targetLanguage: Text) : async () {
    let newRecord : TranslationRecord = {
      original = original;
      translated = translated;
      targetLanguage = targetLanguage;
    };
    let buffer = Buffer.fromArray<TranslationRecord>(translationHistory);
    buffer.add(newRecord);
    translationHistory := Buffer.toArray(buffer);
  };

  // Function to get translation history
  public query func getTranslationHistory() : async [TranslationRecord] {
    translationHistory
  };
}
