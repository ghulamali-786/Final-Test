 document.addEventListener('DOMContentLoaded', function() {
            const userId = 'user123'; // Placeholder for dynamic user data fetched from backend
            const referralCode = generateReferralCode(userId); 
            const referralLink = `https://t.me/Apple5788_bot/Apple/referral?code=${referralCode}`;
            
            document.getElementById('link').value = referralLink;

            document.getElementById('copyButton').addEventListener('click', function() {
                const copyText = document.getElementById('link');
                copyText.select();
                document.execCommand('copy');
            });

            // Function to generate a unique referral code (typically handled by backend)
            function generateReferralCode(userId) {
                return btoa(userId); // Just a basic encoding of user ID, change this for real-world use
            }
        });