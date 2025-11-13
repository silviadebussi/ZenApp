function Card({ children, onPress }) {
if (onPress) return (
<TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
{children}
</TouchableOpacity>
);
return (
<View style={styles.card}>{children}</View>
);
}