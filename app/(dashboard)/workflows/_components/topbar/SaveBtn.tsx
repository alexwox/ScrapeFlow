"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

function SaveBtn() {
    return (
        <Button
            variant={"outline"}
            className='flex items-center gap-2'
            onClick={() => {
                alert("TODO");
            }}
        >
            Save
        </Button>
    )
}

export default SaveBtn