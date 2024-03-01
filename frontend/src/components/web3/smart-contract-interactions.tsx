'use client'

import { FC, useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import {
    contractQuery,
    decodeOutput,
    useInkathon,
    useRegisteredContract,
} from '@scio-labs/use-inkathon'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

type IssueCertificateValues = { studentId: string; courseId: string; certificateHash: string }
type VerifyCertificateValues = { studentId: string; courseId: string }

export const CertificatePlatformInteractions: FC = () => {
    const { api, activeAccount, activeSigner } = useInkathon()
    const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Certificates)
    const [updateIsLoading, setUpdateIsLoading] = useState<boolean>()
    const [verifiedCertificateHash, setVerifiedCertificateHash] = useState<string | null>(null)
    const issueForm = useForm<IssueCertificateValues>()
    const verifyForm = useForm<VerifyCertificateValues>()

    const { register, reset, handleSubmit } = issueForm

    const [studentId] = useState('5D5UBvwvkAunKH7kd7ZXjjWzwirTFnogYgNFynpmJRb5ssnr')
    const [courseId] = useState('0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01')
    const [certificateHash] = useState(
        '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    )

    const issueCertificate = async ({
                                        studentId,
                                        courseId,
                                        certificateHash,
                                    }: IssueCertificateValues) => {
        if (!activeAccount || !contract || !activeSigner || !api) {
            toast.error('Wallet not connected. Try again…')
            return
        }

        // Hash the courseId and certificateHash inputs
        //const hashedCourseId = blake2AsHex(courseId);
        //const hashedCertificateHash = blake2AsHex(certificateHash);

        setUpdateIsLoading(true)
        try {
            await contractTxWithToast(api, activeAccount.address, contract, 'issue_certificate', {}, [
                studentId,
                courseId,
                certificateHash,
            ])
            reset()
        } catch (e) {
            console.error(e)
            toast.error('Error issuing certificate. Check console for details.')
        } finally {
            setUpdateIsLoading(false)
            console.log('Certificate Issued')
        }
    }

    const verifyCertificate = async (data: VerifyCertificateValues) => {
        if (!activeAccount || !contract || !api) return

        const { studentId, courseId } = data

        try {
            const result = await contract.query.verify_certificate(
                activeAccount.address,
                { gasLimit: 0 },
                studentId,
                courseId,
            )

            //const result = await contractQuery(api, '', contract, 'verify_certificate', [studentId, courseId])
            const { isError, decodedOutput } = decodeOutput(result, contract, 'verify_certificate')
            if (isError) throw new Error(decodedOutput)
            setVerifiedCertificateHash(decodedOutput)
        } catch (e) {
            console.error(e)
            toast.error('Error while verifying certificate. Try again…')
            setVerifiedCertificateHash(null)
        }
    }

    return (
        <>
            <div className="flex max-w-[22rem] grow flex-col gap-4">
                <h2 className="text-center font-mono text-gray-400">Certificate Platform Contract</h2>

                <Form {...issueForm}>
                    <Card>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit(issueCertificate)} className="flex flex-col gap-2">
                                <FormItem>
                                    <FormLabel>Student ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder={studentId} disabled={true} {...register('studentId')} />
                                    </FormControl>
                                </FormItem>
                                <FormItem>
                                    <FormLabel>Course ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder={courseId} disabled={true} {...register('courseId')} />
                                    </FormControl>
                                </FormItem>
                                <FormItem>
                                    <FormLabel>Certificate Hash</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={certificateHash}
                                            disabled={true}
                                            {...register('certificateHash')}
                                        />
                                    </FormControl>
                                </FormItem>
                                <Button type="submit" className="bg-primary font-bold">
                                    Issue Certificate
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Form>

                <Form {...verifyForm}>
                    <Card>
                        <CardContent className="pt-6">
                            <form
                                onSubmit={verifyForm.handleSubmit(verifyCertificate)}
                                className="flex flex-col gap-2"
                            >
                                <FormItem>
                                    <FormLabel>Student ID</FormLabel>
                                    <FormControl>
                                        <Input {...verifyForm.register('studentId')} />
                                    </FormControl>
                                </FormItem>
                                <FormItem>
                                    <FormLabel>Course ID</FormLabel>
                                    <FormControl>
                                        <Input {...verifyForm.register('courseId')} />
                                    </FormControl>
                                </FormItem>
                                <Button type="submit" className="bg-primary font-bold">
                                    Verify Certificate
                                </Button>
                            </form>
                            {verifiedCertificateHash && (
                                <p className="text-center">Certificate Hash: {verifiedCertificateHash}</p>
                            )}
                        </CardContent>
                    </Card>
                </Form>

                <p className="text-center font-mono text-xs text-gray-600">
                    Contract Address: {contract ? contractAddress : 'Loading…'}
                </p>
            </div>
        </>
    )
}
