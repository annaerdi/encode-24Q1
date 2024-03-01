#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod certificates {
    use ink::storage::Mapping;
    use ink_prelude::string::String;

    /// Emitted when a new certificate is issued.
    #[ink(event)]
    pub struct CertificateIssued {
        #[ink(topic)]
        student_id: AccountId,
        #[ink(topic)]
        course_id: String,
        certificate_hash: String,
    }

    /// Certificate platform for issuing and verifying certificates.
    #[ink(storage)]
    pub struct Certificates {
        /// Mapping from student ID and course ID to certificate hash.
        certificate: Mapping<(AccountId, String), String>,
    }

    impl Certificates {

        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                certificate: Default::default(),
            }
        }

        #[ink(constructor)]
        pub fn default() -> Self {
            Self::new()
        }

        /// Issue a certificate to a student.
        #[ink(message)]
        pub fn issue_certificate(&mut self, student_id: AccountId, course_id: String, certificate_hash: String) {
            self.certificate.insert((student_id, course_id.clone()), &certificate_hash);
            self.env().emit_event(CertificateIssued {
                student_id,
                course_id,
                certificate_hash,
            });
        }

        /// Verify a student's certificate.
        #[ink(message)]
        pub fn verify_certificate(&self, student_id: AccountId, course_id: String) -> Option<String> {
            self.certificate.get(&(student_id, course_id))
        }

    }

}
