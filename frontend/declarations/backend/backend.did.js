export const idlFactory = ({ IDL }) => {
  const TranslationRecord = IDL.Record({
    'translated' : IDL.Text,
    'targetLanguage' : IDL.Text,
    'original' : IDL.Text,
  });
  return IDL.Service({
    'addTranslation' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'getTranslationHistory' : IDL.Func(
        [],
        [IDL.Vec(TranslationRecord)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
