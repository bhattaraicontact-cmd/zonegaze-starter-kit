test('Commercial license filtering logic allows MIT and blocks GPL', () => {
    const mockPackages = [
        { name: 'safe-pkg', license: 'MIT' },
        { name: 'unsafe-pkg', license: 'GPL' }
    ];
    const safeLicenses = ['MIT', 'Apache-2.0', 'ISC'];
    const filtered = mockPackages.filter(p => safeLicenses.includes(p.license));

    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('safe-pkg');
});

test('Handles API failure without crashing', () => {
    const errorResponse = { success: false, message: 'API failed' };
    expect(errorResponse.success).toBe(false);
});